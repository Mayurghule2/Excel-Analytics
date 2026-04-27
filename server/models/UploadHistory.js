const mongoose = require('mongoose');

const uploadHistorySchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  file_name: { type: String, required: true },
  file_size: Number,
  headers: { type: [String] },
  upload_date: { type: Date, default: Date.now },
  file_path: { type: String, required: true },
  parsed_data: [{}],
  rows: { type: [[mongoose.Schema.Types.Mixed]] },
  row_count: { type: Number, default: 0 },
  status: { type: String, enum: ['pending', 'processed', 'failed'], default: 'pending' },
  
},
{ timestamps: true });

module.exports = mongoose.model('UploadHistory', uploadHistorySchema);