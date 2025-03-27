const express = require('express');
const user_login_controller = require('../controllers/user_login');
const ErrorHandel = require('../Middelware/ErrorMessageHandal');
const { body } = require('express-validator');

const router = express.Router();

router.post('/api/user_login',
    body('username').notEmpty().withMessage('username is required'),
    body('password').notEmpty().withMessage('password is required'),
    ErrorHandel, user_login_controller.login);

router.post('/api/user_register', user_login_controller.register);

module.exports = router;
