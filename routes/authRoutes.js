const express = require('express');
const { register, login, logout, checkAuth, getUserInfo } = require('../controllers/authController');
const { body } = require('express-validator');
const auth = require('../middleware/auth');
const { loginValidationRules, registrationValidationRules } = require('../validators/authValidator');

const router = express.Router();

// Register Route
router.post('/register', registrationValidationRules(), register);
router.get('/check-auth',  checkAuth)
// Login Route
router.post('/login', loginValidationRules(), login);
router.get('/user', getUserInfo);
// Logout Route
router.post('/logout', auth, logout);

router.get('/getUserInfo', loginValidationRules(), getUserInfo);

module.exports = router;
