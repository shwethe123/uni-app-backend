const express = require('express');
const user_login_controller = require('../controllers/user_login');

const router = express.Router();

router.get('./api/user_login', user_login_controller.index);

router.post('/api/user_login', user_login_controller.store);

module.exports = router;
