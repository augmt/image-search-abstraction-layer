"use strict";

const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.send("<p>Lorem ipsum dolor sit amet &hellip;</p>");
});

module.exports = router;
