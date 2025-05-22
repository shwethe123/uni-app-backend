const express = require('express');
const daily_post_controller = require('../../controllers/dail_post_file/daily_post');
const { body } = require('express-validator');
const ErrorMessageHandle = require('../../Middelware/ErrorMessageHandal');

const router = express.Router();

router.get('/api/daily_posts', daily_post_controller.index);

router.post('/api/daily_posts',[
    body('user_name').notEmpty().withMessage('user name is required'),
    body('user_id').notEmpty().withMessage('user id is required'),
    body('user_remark').notEmpty().withMessage('user remark is required'),
], ErrorMessageHandle, daily_post_controller.store);

module.exports = router;