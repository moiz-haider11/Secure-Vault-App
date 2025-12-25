const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 1. User data nikalo
    req.user = decoded.user || decoded;

    // --- 🛠️ THE MAGIC FIX ---
    // Agar token mein 'userId' likha hai, to usay 'id' bana do
    // taake Controller usay padh sake.
    if (req.user.userId) {
        req.user.id = req.user.userId;
    }
    
    // Ab ye 'id', '_id', ya 'userId' sab handle kar lega
    console.log("✅ Final User ID for Controller:", req.user.id || req.user._id); 

    next();
  } catch (err) {
    console.error("❌ Token Error:", err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};