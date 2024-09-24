const validateRegisterInput = (req, res, next) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: 'Name and password are required' });
  }
  next();
};

const validateLoginInput = (req, res, next) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: 'Name and password are required' });
  }
  next();
};

const validateLocationInput = (req, res, next) => {
  const { userId, latitude, longitude } = req.body;
  if (!userId || !latitude || !longitude) {
    return res.status(400).json({ error: 'UserId, latitude, and longitude are required' });
  }
  next();
};

const validateUserIdParam = (req, res, next) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({ error: 'UserId is required' });
  }
  next();
};

module.exports = {
  validateRegisterInput,
  validateLoginInput,
  validateLocationInput,
  validateUserIdParam
};