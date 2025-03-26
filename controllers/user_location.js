const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

client.connect();

const user_location_controller = {
    index: async (req, res) => {
        try {
            const result = await client.query('SELECT * FROM user_location_id ORDER BY auto_id DESC');
            return res.json(result.rows);
        } catch (error) {
            return res.status(500).json({ msg: 'Error', error: error.message });
        }
    },

    store: async (req, res) => {
        try {
            const { user_location_id, user_location} = req.body;
            
            const insertQuery = `
                INSERT INTO user_location_id (user_location_id, "user_location")
                VALUES ($1, $2) RETURNING *
            `;

            const insertResult = await client.query(insertQuery, [user_location_id, user_location]);

            return res.json(insertResult.rows[0]);
        } catch (error) {
            return res.status(500).json({ msg: 'Error', error: error.message });
        }
    },

    show: async (req, res) => {
        try {
            return res.json({msg: "show user id"});
        } catch (error) {
            return res.status(500).json({msg: 'Error', error: error.message});
        }
    },

    update: async (req, res) => {
        try {
            return res.json({ msg: "update user id"});
        } catch (error) {
            return res.status(500).json({ msg: 'Error', error: error.message});
        }
    },

    destroy: async (req, res) => {
        try {
            return res.json({ msg: "deleted user id"});
        } catch (error) {
            return res.status(500).json({ msg: 'Error', error: error.message});
        }
    }

}

module.exports = user_location_controller;