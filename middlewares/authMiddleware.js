const jwt = require('jsonwebtoken');
const User = require('../models/userModel.js');

const authMiddleware = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    const token = req.headers.authorization?.split(' ')[1];

    // If no token is provided, deny access
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID stored in the token
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found. Access denied.' });
    }

    // Attach the user information to the request object
    req.user = user;

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error in authentication middleware:', error);
    return res.status(403).json({ message: 'Invalid token. Access denied.' });
  }
};

module.exports = authMiddleware;
