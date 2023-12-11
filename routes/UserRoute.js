const express = require("express");
const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/User.js");

const { verifyAdmin } = require("../middleware/AuthAdmin.js");

const router = express.Router();

router.get('/users',verifyAdmin,getUsers);
router.get('/users/:id',verifyAdmin,getUserById);
router.post('/users',verifyAdmin,createUser);
router.patch('/users/:id',verifyAdmin,updateUser);
router.delete('/users/:id',verifyAdmin,deleteUser);

module.exports = router;