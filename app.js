const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");
const register = require('./register');
const auth = require('./auth');
const products = require("./products");
const db = require('./db/index'); 
const passport = require("passport");
const session = require("express-session");
const { isAuthenticated } = require('./helpers');

// Use dynamic import for ES module
const loadLocalStrategy = async () => {
    const localStrategy = await import("./strategies/local-strategy.mjs");
    localStrategy.default; 
};

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(express.json());
app.use(session({
    secret: "filippopendyk",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60,
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send("Hello World!");
});

app.use('/register', register);
app.use('/auth', auth);
app.use('/products', products);

/*
    ENDPOINTS 

    /register - used for registering a user

    /login - used for login

    /products - used for retrieving all products data

    /products/id - used for retrieving specific product data

    /users - used for retrieving all users data

    /users/id - used for retrieving specific user data

    /carts - used for retrieving all carts data

    /carts/id - used for retrieving specific cart data
*/

app.listen(port, async () => {
    console.log(`App listening on port ${port}`);
    await loadLocalStrategy(); 
});
