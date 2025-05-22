const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

client.connect();

const daily_post_controller = {
    index : async (req, res) => {
        try {
            const result = await client.query('SELECT * FROM worker_daily_post_db ORDER BY auto_id DESC');
            return res.json(result.rows);
        } catch (error) {
            return res.status(500).json({msg: "Error", error: error.message});
        }
    },

    store : async (req, res) => {
        try {
            const { user_name, user_id, user_remark } = req.body;

            const insertQuery = `
                INSERT INTO worker_daily_post_db (user_name, user_id, user_remark)
                VALUES ($1, $2, $3) RETURNING *
            `
            const insertResult = await client.query(insertQuery, [user_name, user_id, user_remark]);

            return res.json(insertResult.rows[0]);
        } catch (error) {
            return res.status(500).json({msg: 'Error', error: error.message});
        }
    },
};

module.exports = daily_post_controller;