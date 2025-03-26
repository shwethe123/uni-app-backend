const express = require('express');
const user_location_controller = require('../controllers/user_location')

const router = express.Router();

router.get('/api/user_location', user_location_controller.index);

router.post('/api/user_location', user_location_controller.store);

router.get('/api/user_location/:id', user_location_controller.show);

router.put('/api/user_location/:id', user_location_controller.update);

router.delete('/api/user_location/:id', user_location_controller.destroy);

module.exports = router;