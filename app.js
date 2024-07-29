const express = require("express");
const port = 3000;
const app = express();
const db = require('./db/index');
const bodyParser = require("body-parser");
const router = require('express').Router();
const register = require('./register');
const auth = require('./auth');
const passport = require('passport')
const session = require("express-session");

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get('/', (req, res) => {
    res.send("Hello World!")  
})

app.use('/register', register);
app.use('/auth', auth);

/*

    ENDPOINTS 

    /register - used for registering an user

    /login - used for login

    /products - used for retrieving all products data

    /products/id - used for retrieving specific product data

    /users - used for retrieving all users data

    /users/id - used for retrieving specific user data

    /carts - used for retrieving all carts data

    /carts/id - used for retrieving specific cart data

*/

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})
