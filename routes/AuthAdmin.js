const express = require("express");
const {
    login,
    logout,
    verify_admin
} = require("../controllers/AuthAdmin.js");

const router = express.Router();

router.post('/admins_login',login);
router.get('/admins_verify',verify_admin);
router.delete('/admins_logout',logout);

module.exports = router;