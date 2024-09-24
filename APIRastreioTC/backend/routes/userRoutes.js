const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {
  validateRegisterInput,
  validateLoginInput,
  validateLocationInput,
  validateUserIdParam
} = require('../middlewares/validateUserInput');

router.post('/register', validateRegisterInput, userController.createUser);
router.post('/login', validateLoginInput, userController.loginUser);
router.put('/location', validateLocationInput, userController.updateUserLocation);
router.get('/user/:userId', validateUserIdParam, userController.getUserInfo);

module.exports = router;