const User = require('../models/user');
const UploadHistory = require('../models/UploadHistory');
const Contact = require('../models/Contact');
const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');


exports.getAllUsers = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const users = await User.find().select('-password_hash');
  res.json(users);
};

exports.getUserById = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    const user = await User.findById(req.params.id)
      .select('-password_hash')
      .populate({
        path: 'uploads',
        select: 'file_name upload_date status',
        options: { sort: { upload_date: -1 } }
      });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user by ID:", err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.toggleUserStatus = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  user.isActive = !user.isActive;
  await user.save();
  res.json({ message: 'User status updated', isActive: user.isActive });
};

exports.getAllUploads = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const uploads = await UploadHistory.find().populate('user_id', 'username email');
  res.json(uploads);
};

exports.updateFileStatus = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const { status } = req.body;
  const file = await UploadHistory.findById(req.params.id);
  if (!file) return res.status(404).json({ error: 'File not found' });

  file.status = status;
  await file.save();
  res.json({ message: 'File status updated', status });
};

exports.downloadFile = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const file = await UploadHistory.findById(req.params.id);
  if (!file) return res.status(404).json({ error: 'File not found' });

  res.download(path.join(__dirname, '..', file.file_path));
};

exports.deleteFile = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const file = await UploadHistory.findById(req.params.id);
  if (!file) return res.status(404).json({ error: 'File not found' });

  fs.unlinkSync(path.join(__dirname, '..', file.file_path));
  await UploadHistory.findByIdAndDelete(req.params.id);
  res.json({ message: 'File deleted' });
};

exports.getAnalytics = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const upload = await UploadHistory.findById(req.params.id);
  if (!upload) return res.status(404).json({ error: 'Upload not found' });

  res.json({ parsed_data: upload.parsed_data });
};

exports.exportCSV = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const upload = await UploadHistory.findById(req.params.id);
  if (!upload) return res.status(404).json({ error: 'Upload not found' });

  const parser = new Parser();
  const csv = parser.parse(upload.parsed_data);

  res.header('Content-Type', 'text/csv');
  res.attachment(`${upload.file_name}.csv`).send(csv);
};

exports.exportPDF = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const upload = await UploadHistory.findById(req.params.id);
  if (!upload) return res.status(404).json({ error: 'Upload not found' });

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${upload.file_name}.pdf`);
  doc.pipe(res);
  doc.fontSize(12).text(JSON.stringify(upload.parsed_data, null, 2));
  doc.end();
};

exports.getErrorLogs = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const logs = await UploadHistory.find({ status: 'failed' })
    .select('file_name upload_date status')
    .populate('user_id', 'username');
  res.json(logs);
};

exports.downloadErrorLogs = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  const failedUploads = await UploadHistory.find({ status: 'failed' });

  let csv = 'File Name,Upload Date,Status\n';
  failedUploads.forEach(file => {
    csv += `${file.file_name},${file.upload_date.toISOString()},${file.status}\n`;
  });

  res.attachment('error_logs.csv');
  res.status(200).send(csv);
};

exports.getDashboardStats = async (req, res) => {
  try {
     const allUsers = await User.find();
    console.log("DEBUG USERS:", allUsers);

    const totalUsers = await User.countDocuments();
    const totalFilesUploaded = await UploadHistory.countDocuments();

    const rowCountAgg = await UploadHistory.aggregate([
      { $group: { _id: null, totalRows: { $sum: "$row_count" } } }
    ]);
    const totalRowsAnalyzed = rowCountAgg[0]?.totalRows || 0;

    const lastUpload = await UploadHistory.findOne().sort({ upload_date: -1 });

    res.status(200).json({
      totalUsers,
      totalFilesUploaded,
      totalRowsAnalyzed,
      lastUploadTimestamp: lastUpload?.upload_date || null
    });
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getUploadStats = async (req, res) => {
  const { type } = req.params;

  let dateFormat;
  switch (type) {
    case 'daily':
      dateFormat = "%Y-%m-%d"; 
      break;
    case 'weekly':
      dateFormat = "%G-W%V"; 
      break;
    case 'monthly':
      dateFormat = "%Y-%m"; 
      break;
    default:
      return res.status(400).json({ message: 'Invalid type (daily, weekly, monthly)' });
  }

  try {
    const uploadStats = await UploadHistory.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: dateFormat, date: "$upload_date" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const response = uploadStats.map(item => ({
      label: item._id,
      uploads: item.count
    }));
    console.log('Upload stats generated:', response);

    res.status(200).json(response);
  } catch (err) {
    console.error('Error generating upload stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUploadInsights = async (req, res) => {
  try {
    const totalUploads = await UploadHistory.countDocuments();

    const processed = await UploadHistory.countDocuments({ status: 'processed' });
    const pending = await UploadHistory.countDocuments({ status: 'pending' });
    const failed = await UploadHistory.countDocuments({ status: 'failed' });
    const largeUploads = await UploadHistory.countDocuments({ file_size: { $gt: 100 * 1024 * 1024 } }); // >100MB

    const rowCountAgg = await UploadHistory.aggregate([
      { $group: { _id: null, totalRows: { $sum: "$row_count" } } }
    ]);
    const totalRows = rowCountAgg[0]?.totalRows || 0;

    const latestUpload = await UploadHistory.findOne().sort({ upload_date: -1 });

    const percent = (count) => totalUploads > 0 ? Math.round((count / totalUploads) * 100) : 0;

    const insights = {
      progressBars: [
        { title: 'Processed Files', percent: percent(processed), color: 'bg-blue-500' },
        { title: 'Pending Uploads', percent: percent(pending), color: 'bg-yellow-500' },
        { title: 'Failed Uploads', percent: percent(failed), color: 'bg-red-500' },
        { title: 'Large Files >100MB', percent: percent(largeUploads), color: 'bg-purple-500' }
      ],
      totalUploads,
      totalRowsProcessed: totalRows,
      latestUpload: latestUpload ? {
        file_name: latestUpload.file_name,
        upload_date: latestUpload.upload_date,
        status: latestUpload.status,
        sizeMB: ((latestUpload.file_size || 0) / (1024 * 1024)).toFixed(2)
      } : null
    };

    res.status(200).json(insights);
  } catch (err) {
    console.error('Error fetching upload insights:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAllContactMessages = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied' });

  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error('Failed to fetch contact messages:', err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};