/** @format */

const express = require("express");
const { addAdmin, adminLogin } = require("../Controller/Login/LoginController");
const router = express.Router();
const { myValidations } = require("../Validator/Validator");

router.post("/api-admin-singup", myValidations, addAdmin);

router.post("/api-admin-login", adminLogin);

module.exports = router;
