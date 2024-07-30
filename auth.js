const express = require("express");
const router = express.Router();
const db = require('./db/index');
const passport = require("passport");
require("./passportConfig")(passport);

router.use((req, res, next) => {
    next();
});

router.post('/login', passport.authenticate("local"), (req, res) => {
    res.sendStatus(200);
})

router.get("/status", (req, res) => {
    console.log("Inside status endpoint");
    console.log(req.user);
    console.log(req.session);
    if(req.user) return res.send(req.user);
    return res.sendStatus(401);
})

router.post("/logout", (req, res) => {
    if(!req.user) return res.sendStatus(401);
    req.logout((err) => {
        if (err) return res.sendStatus(400);
        res.sendStatus(200);
    })
})

module.exports = router;