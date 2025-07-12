const AnalysisResults = require('../models/AnalysisResults');



exports.saveAnalysis = async (req, res) => {
  try {
    const { upload_id, chart_type, x_axis, y_axis, result_data } = req.body;

    const analysis = new AnalysisResults({
      upload_id,
      chart_type,
      x_axis,
      y_axis,
      result_data
    });

    await analysis.save();

    res.status(201).json({
      message: 'Analysis saved successfully',
      analysisId: analysis._id
    });

  } catch (error) {
    console.error('Error saving analysis:', error.message);
    res.status(500).json({ message: 'Failed to save analysis', error: error.message });
  }
};


exports.saveAIInsight = async (req, res) => {
  try {
    const { analysis_id, insight_text } = req.body;

    const insight = new AIInsights({
      analysis_id,
      insight_text
    });

    await insight.save();

    res.status(201).json({ message: 'AI Insight saved successfully' });

  } catch (error) {
    console.error('Error saving AI insight:', error.message);
    res.status(500).json({ message: 'Failed to save AI insight', error: error.message });
  }
};
