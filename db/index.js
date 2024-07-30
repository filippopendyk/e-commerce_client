const Pool = require('pg').Pool;
const { v4: uuidv4 } = require("uuid");
const { hashPassword, comparePasswords } = require('../helpers');
const { use } = require('passport');

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

const selectUser = async (username) => {
    let selectQuery = {
        name: 'select-user',
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username]
    }
    const res = await pool.query(selectQuery);
    return res;
}

const selectUserDetails = async (username, password) => {
    try {
        // Select the user details based on the username
        let selectUserDetailsQuery = {
            name: 'select-user-details',
            text: 'SELECT * FROM users WHERE username = $1',
            values: [username]
        };
        
        const res = await pool.query(selectUserDetailsQuery);
        
        // Check if any rows were returned
        if (res.rows.length > 0) {
            const userDetails = res.rows[0];
            const storedPasswordHash = userDetails.password_hash;

            // Compare the provided password with the stored hashed password
            const isPasswordValid = await comparePasswords(password, storedPasswordHash);
            
            if (isPasswordValid) {
                return userDetails;
            } else {
                console.log('Invalid password');
                return null;
            }
        } else {
            console.log('No user found with the provided username.');
            return null;
        }
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error executing query:', error);
        throw error;
    }
};

module.exports = {
    createUser,
    selectUser,
    selectUserDetails
}