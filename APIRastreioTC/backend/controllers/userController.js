const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const createUser = (req, res) => {
  const { name, password } = req.body;
  console.log('Creating user:', { name, password });

  userModel.createUser(name, password, (err, userId) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: err.message });
    }
    
    const token = jwt.sign({ id: userId, name }, process.env.JWT_SECRET);
    res.status(201).json({ userId, token });
  });
};

const loginUser = (req, res) => {
  const { name, password } = req.body;
  console.log('Logging in user:', { name, password });

  userModel.getUserByName(name, (err, user) => {
    if (err) {
      console.error('Error logging in user:', err);
      return res.status(500).json({ error: err.message });
    }
    if (!user || user.password !== password) {
      console.error('Invalid credentials');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);
    res.status(200).json({ userId: user.id, token });
  });
};

const updateUserLocation = (req, res) => {
  const { userId, latitude, longitude } = req.body;
  console.log('Updating user location:', { userId, latitude, longitude });

  userModel.updateUserLocation(userId, latitude, longitude, (err, results) => {
    if (err) {
      console.error('Error updating user location:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: 'Location updated successfully' });
  });
};

const getUserInfo = (req, res) => {
  const { userId } = req.params;
  console.log('Getting user info for userId:', userId);

  userModel.getUserInfo(userId, (err, userInfo) => {
    if (err) {
      console.error('Error getting user info:', err);
      return res.status(500).json({ error: err.message });
    }
    if (!userInfo) {
      console.error('User not found');
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(userInfo);
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUserLocation,
  getUserInfo
};