const express = require("express");
const {
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
} = require("../controllers/Admin.js");
const { ownerOnly, verifyAdmin } = require("../middleware/AuthAdmin.js");

const router = express.Router();

router.get('/admins', verifyAdmin,ownerOnly,getAdmins);
router.get('/admins/:id',verifyAdmin,ownerOnly,getAdminById);
router.post('/admins',verifyAdmin,ownerOnly,createAdmin);
router.patch('/admins/:id',verifyAdmin,ownerOnly,updateAdmin);
router.delete('/admins/:id',verifyAdmin,ownerOnly,deleteAdmin);

module.exports = router;