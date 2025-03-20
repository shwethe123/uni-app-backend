const mongoose = require('mongoose');
const electricity_meter_schema = require("../model/Electiricity_meter");

const electricity_meter_controller = {
    index: async (req, res) => {
        try {
            const scoreAll = await electricity_meter_schema.find().sort({ updatedAt: -1 });
            return res.json(scoreAll);
        } catch (error) {
            return res.status(500).json({ msg: 'Error', error: error.message });
        }
    },

    store: async (req, res) => {
        try {
            console.log("📸 Uploaded File Data:", req.file);
            const { user_id, current_meter, last_reading, price } = req.body;

            if (!req.file) {
                return res.status(400).json({ msg: "Image upload failed! No file received." });
            }
    
            const el_meter_image = req.file.path; 
    
            if (!user_id || !current_meter || !last_reading || !price) { 
                return res.status(400).json({ msg: "All fields are required" });
            }
    
            const total_meter = last_reading - current_meter;
            const edit_price = total_meter * price;
    
            const meter = await electricity_meter_schema.create({
                user_id,
                current_meter,
                last_reading,
                total_meter, 
                edit_price,
                el_meter_image
            });
    
            return res.status(201).json(meter);
        } catch (error) {
            console.error("🚨 Upload Error:", error);
            return res.status(500).json({ msg: "Error", error: error.message });
        }
    },
    

    show: async (req, res) => {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'Invalid ID format' });
            }
            const meter_detail = await electricity_meter_schema.findById(id);
            if (!meter_detail) {
                return res.status(404).json({ msg: 'Post not found' });
            }

            return res.json(meter_detail);
        } catch (error) {
            return res.status(500).json({ msg: 'Error', error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'Invalid ID format' });
            }

            const { current_meter, last_reading } = req.body;

            if (current_meter !== undefined && last_reading !== undefined) {
                const total_meter = current_meter - last_reading;

                const meter_update = await electricity_meter_schema.findByIdAndUpdate(id, { 
                    ...req.body, 
                    total_meter 
                }, { new: true });

                return res.json(meter_update);
            } else {

                const meter_update = await electricity_meter_schema.findByIdAndUpdate(id, { 
                    ...req.body 
                }, { new: true });

                return res.json(meter_update);
            }
        } catch (error) {
            return res.status(500).json({ msg: 'Error', error: error.message });
        }
    },

    destroy: async (req, res) => { 
        try {
            const id = req.params.id;
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ msg: 'Invalid ID format' });
            }

            await electricity_meter_schema.findByIdAndDelete(id);
            return res.json({ msg: 'Post deleted successfully' });
        } catch (error) {
            return res.status(500).json({ msg: 'Error', error: error.message });
        }
    }
};

module.exports = electricity_meter_controller;
