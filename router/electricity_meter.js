const express = require('express');
const electricity_meter_controller = require('../controllers/electricity_meter');
const ErrorMessageHandle = require('../Middelware/ErrorMessageHandal');
const { body } = require('express-validator');
const routers = express();

routers.get('/api/eletricity_meter', electricity_meter_controller.index);

routers.post('/api/eletricity_meter', [
  body('user_id').notEmpty().withMessage("user is required"),
  body('current_meter').notEmpty().withMessage("current_meter is required"),
  body('price').notEmpty().withMessage("price is required"),
], ErrorMessageHandle, electricity_meter_controller.store);

routers.get('/api/eletricity_meter/:id', electricity_meter_controller.show);

routers.put('/api/eletricity_meter/:id', electricity_meter_controller.update);

routers.delete('/api/eletricity_meter/:id', electricity_meter_controller.destroy);

module.exports = routers;