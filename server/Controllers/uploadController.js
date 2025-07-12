const XLSX = require('xlsx');
const UploadHistory = require('../models/UploadHistory');

exports.uploadFile = async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
    const rowCount = data.length;

    const upload = new UploadHistory({
      user_id: req.user.id,
      file_name: req.file.originalname,
      file_path: req.file.originalname,
      parsed_data: data,
      row_count: rowCount,
      status: 'processed'
    });
    await upload.save();
    res.status(201).json({ message: 'Upload successful', uploadId: upload._id });
  } catch (err) {
    res.status(500).json({ message: 'Upload error', error: err.message });
  }
};
