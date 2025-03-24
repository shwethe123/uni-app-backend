// model/Electiricity_meter.js
// No longer using mongoose, so this file will contain the SQL for table creation.

const createTableQuery = `
CREATE TABLE "electricity_meter" (
    auto_id SERIAL PRIMARY KEY,  -- auto-incrementing ID
    user_id VARCHAR(255) NOT NULL,
    current_meter VARCHAR(255) NOT NULL,
    last_reading VARCHAR(255) NOT NULL,
    total_meter VARCHAR(255),
    edit_price NUMERIC NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`;

module.exports = { createTableQuery };