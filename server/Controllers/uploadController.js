const XLSX = require('xlsx');
const UploadHistory = require('../models/UploadHistory');

exports.uploadFile = async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.SheetNames[0];
    const rawData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], { header: 1 }); 

    const headers = rawData[0];
    const rows = rawData.slice(1);
    const rowCount = rows.length;

    const upload = new UploadHistory({
      user_id: req.user.id,
      file_name: req.file.originalname,
      file_path: req.file.originalname,
      parsed_data: rawData, 
      headers,
      rows,
      row_count: rowCount,
      status: 'processed'
    });

    await upload.save();

    res.status(201).json({
      message: 'Upload successful',
      uploadId: upload._id
    });
  } catch (err) {
    res.status(500).json({ message: 'Upload error', error: err.message });
  }
};

exports.getChartData = async (req, res) => {
  try {
    const upload = await UploadHistory.findById(req.params.id);

    if (!upload || upload.user_id.toString() !== req.user.id.toString()) {
      return res.status(404).json({ message: 'Data not found or unauthorized' });
    }

    res.json({
      headers: upload.headers,
      rows: upload.rows
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching chart data', error: err.message });
  }
};
