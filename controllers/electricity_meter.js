const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  port: process.env.DB_PORT || 5432,
  password: process.env.DB_PASSWORD || "shwethe1230",
  database: process.env.DB_DATABASE || 'mydb'
});

client.connect();

const electricity_meter_controller = {
    index: async (req, res) => {
        try {
          const result = await client.query('SELECT * FROM Electricity_meter ORDER BY auto_id DESC');
          return res.json(result.rows);
        } catch (error) {
          return res.status(500).json({ msg: 'Error', error: error.message });
        }
      },

  store: async (req, res) => {
    try {
      const { user_id, current_meter, price, user_location } = req.body;
      let { last_reading } = req.body;

      const lastRecordQuery = 'SELECT current_meter FROM Electricity_meter WHERE user_id = $1 ORDER BY updated_at DESC LIMIT 1';
      const lastRecordResult = await client.query(lastRecordQuery, [user_id]);

      if (lastRecordResult.rows.length > 0) {
        last_reading = lastRecordResult.rows[0].current_meter;
      }

      if (!user_id || !current_meter || !last_reading || !price || !user_location) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      const total_meter = current_meter - last_reading;
      const edit_price = total_meter * price;

      const insertQuery = `
        INSERT INTO Electricity_meter (user_id, current_meter, last_reading, total_meter, edit_price, user_location) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
      const insertResult = await client.query(insertQuery, [user_id, current_meter, last_reading, total_meter, edit_price, user_location]);

      return res.status(201).json(insertResult.rows[0]);
    } catch (error) {
      console.error("Upload Error:", error);
      return res.status(500).json({ msg: "Error", error: error.message });
    }
  },

  show: async (req, res) => {
    try {
      const id = req.params.id;
      const result = await client.query('SELECT * FROM Electricity_meter WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).json({ msg: 'Post not found' });
      }
      return res.json(result.rows[0]);
    } catch (error) {
      return res.status(500).json({ msg: 'Error', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const { current_meter, last_reading, user_id, price } = req.body;
      let total_meter = null;
      let edit_price = null;
      if (current_meter && last_reading) {
        total_meter = current_meter - last_reading;
        edit_price = total_meter * price;
      }

      const updateQuery = `
        UPDATE Electricity_meter 
        SET user_id = $1, current_meter = $2, last_reading = $3, total_meter = $4, edit_price = $5, updated_at = NOW()
        WHERE id = $6 RETURNING *`;
      const updateResult = await client.query(updateQuery, [user_id, current_meter, last_reading, total_meter, edit_price, id]);

      if (updateResult.rows.length === 0) {
        return res.status(404).json({ msg: 'Post not found' });
      }

      return res.json(updateResult.rows[0]);
    } catch (error) {
      return res.status(500).json({ msg: 'Error', error: error.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const id = req.params.id;
      await client.query('DELETE FROM Electricity_meter WHERE id = $1', [id]);
      return res.json({ msg: 'Post deleted successfully' });
    } catch (error) {
      return res.status(500).json({ msg: 'Error', error: error.message });
    }
  }
};

module.exports = electricity_meter_controller;