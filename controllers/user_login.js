const { Client } = require('pg');
const bcrypt = require('bcryptjs');
const create_token = require('../helpers/create_token');

const client = new Client({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

client.connect();

const user_login_controller = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
    
            if (!username || !password) {
                return res.status(400).json({ msg: 'Username and password are required' });
            }
    
            const userQuery = 'SELECT * FROM user_login_db WHERE username = $1';
            const userResult = await client.query(userQuery, [username]);
    
            if (userResult.rows.length === 0) {
                return res.status(400).json({ msg: 'User not found' });
            }
    
            const user = userResult.rows[0];
            const isMatch = await bcrypt.compare(password, user.password);
    
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid password' });
            }
    
            
            const user_id = userResult.rows[0].auto_id; 
    
            let token = create_token(user_id);
    
            res.cookie('jwt', token, {
                httpOnly: true, 
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3 * 24 * 60 * 60 * 1000
            });
            
            return res.json({ msg: 'Login successful', user, token });
        } catch (error) {
            return res.status(500).json({ msg: 'Error', error: error.message });
        }
    },
    

    register: async (req, res) => {
        try {
            console.log('Request received:', req.body);
    
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({ msg: 'Username and password are required' });
            }
    
            const checkUserQuery = 'SELECT * FROM user_login_db WHERE username = $1';
            const checkUserResult = await client.query(checkUserQuery, [username]);
    
            if (checkUserResult.rows.length > 0) {
                return res.status(400).json({ msg: 'Username already exists' });
            }
    
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed password:', hashedPassword);
    
            const insertQuery = `
                INSERT INTO user_login_db (username, password)
                VALUES ($1, $2) RETURNING *
            `;
    
            const insertResult = await client.query(insertQuery, [username, hashedPassword]);
            console.log('Insert result:', insertResult.rows);
    
            if (insertResult.rows.length === 0) {
                return res.status(500).json({ msg: 'Failed to insert data' });
            }
    
            const user_id = insertResult.rows[0].auto_id;
    
            let token = create_token(user_id);
            res.cookie('jwt', token);
            return res.status(201).json({ user_id, token, msg: 'User created successfully' });
        } catch (error) {
            console.error('Error during insert:', error);
            return res.status(500).json({ msg: 'Error', error: error.message });
        }
    },
};

module.exports = user_login_controller;
