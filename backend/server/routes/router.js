const express = require("express");
const { findALL, create } = require("../controller/controller");

const router = express.Router();

router
    .get("/", findALL)
    .post("/", create)


module.exports = router;