const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenticateToken = (req, res, next) => {
  const token = req.headers['Authorization']?.split(' ')[1]; 
  if (!token) {
    return res.status(401).json({ message: 'Access token missing or invalid' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; 
    next();
  });
};

router.get('/me', authenticateToken, async (req, res) => {
  console.log('Decoded user in /me route:', req.user); 

  try {
    const user = await User.findById(req.user.id, 'username email');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Fetched user details:', user); 
    res.json({ id: user._id, name: user.username, email: user.email });
  } catch (error) {
    console.error('Error fetching user details in /me:', error); 
    res.status(500).json({ message: 'Server error', error });
  }
});



module.exports = router;
