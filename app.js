const express = require("express");
const port = 3000;
const app = express();
const bodyParser = require("body-parser");
const register = require('./register');
const auth = require('./auth');
// import passport from "passport";
// import session from "express-session";
const db = require('./db/index');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

// app.use(express.json());
// app.use(session({
//     secret: "",
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         maxAge: 60000 * 60,
//     }
// }));

// app.use(passport.initialize());
// app.use(passport.session());

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
    db.selectUserDetails("kot123", "doopcia");
})
