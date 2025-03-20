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
    last_reading: {
        type: String,
        required : true
    },
    total_meter: {
        type: String,
        required : false
    },
    edit_price: {
        type: Number,
        required : true
    },
    // el_meter_image: {
    //     type: String,
    //     default: "https://res.cloudinary.com/dfao1qztg/image/upload/v123456789/default-profile.png"
    // }
}, {timestamps: true});

module.exports = mongoose.model("Electricity_meter", electricity_meter_schema)