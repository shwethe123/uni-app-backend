const express = require('express');
const electricity_meter_controller = require('../controllers/electricity_meter');
const ErrorMessageHandle = require('../Middelware/ErrorMessageHandal');
const {body} = require('express-validator');
const { upload } = require('../config/cloudinary');
const routers = express();

routers.get('/api/eletricity_meter', electricity_meter_controller.index);

// routers.post('/api/eletricity_meter', upload.single('el_meter_image'), [
//     body('user_id').notEmpty().withMessage("user is required"),
//     body('current_meter').notEmpty().withMessage("current_meter is required"),
//     body('last_reading').notEmpty().withMessage("last_reading is required"),
//     body('el_meter_image').notEmpty().withMessage("el_meter_image is required"),
//     body('price').notEmpty().withMessage("price is required"),
// ], ErrorMessageHandle, electricity_meter_controller.store);

routers.post('/api/eletricity_meter', upload.single('el_meter_image'), [
    body('user_id').notEmpty().withMessage("user is required"),
    body('current_meter').notEmpty().withMessage("current_meter is required"),
    body('last_reading').notEmpty().withMessage("last_reading is required"),
    body('price').notEmpty().withMessage("price is required"),
], ErrorMessageHandle, electricity_meter_controller.store);

routers.get('/api/eletricity_meter', electricity_meter_controller.show);

routers.path('/api/eletricity_meter', electricity_meter_controller.update);

routers.delete('/api/eletricity_meter', electricity_meter_controller.destroy);

module.exports = routers;