const User = require('../models/user');
const UploadHistory = require('../models/UploadHistory');

exports.getUserDashboardData = async (req, res) => {
  const userId = req.user.id;

  const uploads = await UploadHistory.find({ user_id: userId }).sort({ upload_date: -1 });

  const total = uploads.length;
  const processed = uploads.filter(u => u.status === 'processed').length;
  const pending = uploads.filter(u => u.status === 'pending').length;
  const failed = uploads.filter(u => u.status === 'failed').length;

  const trend = uploads.reduce((acc, u) => {
    const date = new Date(u.upload_date).toISOString().slice(0, 10);
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const trendData = Object.entries(trend).map(([date, count]) => ({ date, count }));

  res.json({
    totalUploads: total,
    processed,
    pending,
    failed,
    uploadTrend: trendData,
    recentUploads: uploads.slice(0, 5),
  });
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params; 
    if (!id) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
