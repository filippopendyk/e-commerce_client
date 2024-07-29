const Pool = require('pg').Pool;
const { v4: uuidv4 } = require("uuid");
const { hashPassword } = require('../helpers');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ecommerce_client',
    password: 'postgres',
    port: '5432'
});

pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
});

const createUser = async (username, password, email) => {
    const passwordHashed = await hashPassword(password, 10);
    let createQuery = {
        name: 'register-user',
        text: 'INSERT INTO users (username, password_hash, email) VALUES ($1, $2, $3)',
        values: [username, passwordHashed, email]
    }
    const res = await pool.query(createQuery);
    if(res.rowCount == 0) return false;
    return "Successfully registered an user!";
}

const selectUser = async (email) => {
    let selectQuery = {
        name: 'select-user',
        text: 'SELECT * FROM users WHERE email = $1',
        values: [email]
    }
    const res = await pool.query(selectQuery);
    return res;
}

module.exports = {
    createUser,
    selectUser,
}