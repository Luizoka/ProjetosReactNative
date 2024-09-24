const db = require('../config/db');

const createUser = (name, password, callback) => {
  const sql = 'INSERT INTO users (name, password) VALUES (?, ?)';
  db.query(sql, [name, password], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result.insertId);
  });
};

const getUserByName = (name, callback) => {
  const sql = 'SELECT * FROM users WHERE name = ?';
  db.query(sql, [name], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result[0]);
  });
};

const updateUserLocation = (userId, latitude, longitude, callback) => {
  const sql = 'UPDATE users SET latitude = ?, longitude = ? WHERE id = ?';
  db.query(sql, [latitude, longitude, userId], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result);
  });
};

const getUserInfo = (userId, callback) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, result[0]);
  });
};

module.exports = {
  createUser,
  getUserByName,
  updateUserLocation,
  getUserInfo
};