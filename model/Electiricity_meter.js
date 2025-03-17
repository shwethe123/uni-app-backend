const mongoose = require('mongoose');
const schema = mongoose.Schema;

const electricity_meter_schema = new schema({
    user_id: {
        type: String,
        required : true
    },
    current_meter: {
        type: String,
        required : true
    },
    last_meter: {
        type: String,
        required : true
    },
    total_meter: {
        type: String,
        required : true
    },
    price: {
        type: Number,
        required : true
    }
}, {timestamps: true});

module.exports = mongoose.model("Electricity_meter", electricity_meter_schema)