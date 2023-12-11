const Admins = require("../models/AdminModel.js");
const argon = require("argon2");

const getAdmins = async(req,res)=>{
    try {
        const response = await Admins.findAll({
            attributes: ['uuid','name','email','role']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.messgae});
    }
}

const getAdminById = async(req,res)=>{
    try {
        const response = await Admins.findOne({
            attributes: ['uuid','name','email','role'],
            where:{
                uuid: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.messgae});
    }
}

const createAdmin = async(req,res)=>{
    const { name, email, password, confPassword,role} = req.body;
    if(password !== confPassword) return res.status(400).json({msg:"Password dan Confirm Password Tidak cocok"});
    const hashPassword = await argon.hash(password);
    try {
        await Admins.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg:"Register Berhasil"});
    } catch (error) {
        res.status(400).json({msg:error.messgae});
    }
}

const updateAdmin = async(req,res)=>{
    const admin = await Admins.findOne({
        where:{
                uuid: req.params.id
            }
        });
    if(!admin) return res.status(404).json({msg:"Admin Tidak Di temukan"});
    const { name, email, password, confPassword,role} = req.body;
    let hashPassword;
    if(password === "" || password === null){
        hashPassword = admin.password;
    }else{
        hashPassword = await argon.hash(password);
    }
    if(password !== confPassword) return res.status(400).json({msg:"Password dan Confirm Password Tidak cocok"});
    try {
        await Admins.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: admin.id
            }
        });
        res.status(200).json({msg:"Admin Berhasil di Update"});
    } catch (error) {
        res.status(400).json({msg:error.messgae});
    }
}

const deleteAdmin = async(req,res)=>{
    const admin = await Admins.findOne({
        where:{
                uuid: req.params.id
            }
        });
    if(!admin) return res.status(404).json({msg:"Admin Tidak Di temukan"});
    try {
        await Admins.destroy({
            where:{
                id: admin.id
            }
        });
        res.status(200).json({msg:"Admin Berhasil di Hapus"});
    } catch (error) {
        res.status(400).json({msg:error.messgae});
    }

}

module.exports = {
    getAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
}