const express = require('express');
const User_id_controller = require('../../controllers/user_id_file/user_id');

const router = express.Router();

router.get('/api/user_id', User_id_controller.index);

router.post('/api/user_id', User_id_controller.store);

module.exports = router;