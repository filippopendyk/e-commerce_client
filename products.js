const express = require("express");
const router = express.Router();
const db = require("./db/index");

router.use((req, res, next) => {
    next();
})

router.get("/", (req, res) => {
    console.log("You accessed products route");
    res.sendStatus(200);
});

module.exports = router;