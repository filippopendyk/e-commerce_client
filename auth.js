const express = require("express");
const router = express.Router();
const db = require('./db/index');
const passport = require("passport");
require("./passportConfig")(passport);

router.use((req, res, next) => {
    console.log("You successfully accessed auth router");
    next();
});

router.post('/login', passport.authenticate("local-login", {session: false}), (req, res, next) => {
    // const { username, password, email } = req.query;
    // console.log(username, password, email);
    // res.status(201).send("Successfully posted user to authenticate");
    res.json({user: req.user});
})

module.exports = router;