
const { Client } = require('pg');

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

client.connect();

const user_id_controller = {
    index : async (req, res) => {

        try {
            // const {auto_id, user_id} = req.body;
            // if (!auto_id || !user_id) {
            //     return res.status(400).json({msg: "auto_id and password are required"})
            // }
            const result = await client.query('SELECT * FROM user_id_db ORDER BY auto_id DESC');
            return res.json(result.rows);

        } catch (error) {
            return res.status(500).json({msg: 'Error', error: error.message });
        }
    },

    store : (req, res) => {
        return res.json({msg: 'user id store'})
    }
}

module.exports = user_id_controller;