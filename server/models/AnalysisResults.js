const mongoose = require('mongoose');

const analysisResultsSchema = new mongoose.Schema({
  upload_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UploadHistory', required: true },
  chart_type: { type: String, enum: ['bar', 'line', 'pie', 'scatter', '3D_column'], required: true },
  x_axis: String,
  y_axis: String,
  generated_at: { type: Date, default: Date.now },
  result_data: Object
},
{ timestamps: true });

module.exports = mongoose.model('AnalysisResults', analysisResultsSchema);