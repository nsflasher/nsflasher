const express = require("express");

const { 
    user_login, 
    user_logout, 
    user_verify 
} = require("../controllers/AuthUser.js");

const router = express.Router();

router.post('/users_login',user_login)
router.get('/users_verify', user_verify)
router.delete('/users_logout', user_logout)

module.exports =  router;