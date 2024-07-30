const express = require("express");
const router = express.Router();
const db = require('./db/index');

router.use((req, res, next) => {
    console.log("You successfully accessed register route");
    next();
});

router.post('/', async (req, res) => {
    const { username, password, email } = req.query;

    const data = await db.selectUser(username);
    const arr = data.rows;

    if(arr.length != 0){
        return res.status(400).json({
            error: 'User with this email is already registered.'
        })
    } else {
        if(!password || !username || !email){
            return res.status(400).json({
                error: 'Please provide all necessary information.'
            })
        }
        db.createUser(username, password, email);
        return res.status(200).send({ message: 'User successfully added to database.'});
    }
});

module.exports = router;