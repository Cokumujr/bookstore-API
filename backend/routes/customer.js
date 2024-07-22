const express = require("express");

const { getCustomers, } = require("../controllers/customers");

const router = express.Router();

router.get("/", getCustomers);


module.exports = router;