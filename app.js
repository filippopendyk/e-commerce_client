const express = require("express");
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World!")
    
})

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
