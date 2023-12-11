const Admins = require("../models/AdminModel.js");
const argon = require("argon2");

const login = async(req,res)=>{
    const admin = await Admins.findOne({
        where:{
               email: req.body.email
            }
        });
    if(!admin) return res.status(404).json({msg:"Admin Tidak Di temukan"});
    const match = await argon.verify(admin.password , req.body.password);
    if(!match) return res.status(400).json({msg:"Password Salah"});
    req.session.adminId = admin.uuid;
    const uuid = admin.uuid;
    const name = admin.name;
    const email = admin.email;
    const role = admin.role;
    res.status(200).json({uuid,name,email,role});
}

const verify_admin = async (req,res)=>{
    if(!req.session.adminId){
        return res.status(401).json({msg:"Mohon Login Terlebih dahulu"});
    }
    const admin = await Admins.findOne({
        attributes:['uuid','name','email','role'],
        where:{
               uuid: req.session.adminId
            }
        });
    if(!admin) return res.status(404).json({msg:"Admin Tidak Di temukan"});
    res.status(200).json(admin);
}

const logout = async(req,res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg:"Tidak Dapa logout"});
        res.status(200).json({msg:"Anda telah berhasil logout"});
    });

}

module.exports = {
    login,
    verify_admin,
    logout
}