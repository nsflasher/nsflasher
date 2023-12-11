const Users = require("../models/UserModel.js") ;
const Admins = require("../models/AdminModel.js");
const { Op } = require( "sequelize");

const getUsers = async(req,res)=>{
    try {
        let response;
        if(req.role === "owner"){
            response = await Users.findAll({
                include:[{
                    model: Admins,
                    attributes:['name']
                }]
            });
        }else{
            response = await Users.findAll({
                where:{
                    adminId: req.adminId
                },
                include:[{
                    model: Admins,
                    attributes:['name']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const getUserById = async(req,res)=>{
    try {
        const user = await Users.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg:"User Tidak Di temukan"});
        let response;
        if(req.role === "owner"){
            response = await Users.findOne({
                where:{
                    id: user.id
                },
                include:[{
                    model: Admins,
                    attributes:['name']
                }]
            });
        }else{
            response = await Users.findOne({
                where:{
                    [Op.and]:[ { id:user.id },{ adminId: req.adminId } ]
                },
                include:[{
                    model: Admins,
                    attributes:['name']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}

const createUser = async(req,res)=>{
    const { username, email,password,android_id,expiry } = req.body;
    try {
        let nameUsed;
        let emailUsed;
        nameUsed = await Users.findOne({
            where:{
                username: username
            }
        });
        emailUsed = await Users.findOne({
            where:{
                email: email
            }
        });
        if(nameUsed !== null){
            return res.status(403).json({msg:"Username Telah Terdaftar"});
        }
        if(emailUsed !== null){
            return res.status(403).json({msg:"Email Telah Terdaftar"});
        }
        await Users.create({
            username: username,
            email: email,
            password: password,
            android_id: android_id,
            expiry: expiry,
            adminId: req.adminId
        });
        res.status(201).json({msg:"Berhasil tambah data user"}); 
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

const updateUser = async(req,res)=>{
    try {
        const user = await Users.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg:"User Tidak Di temukan"});
        const { username, email,password,android_id,expiry } = req.body;
        if(req.role === "owner"){
           await Users.update({username,email,password,android_id,expiry},{
            where:{
                id: user.id
            }
           });
        }else{
            if(req.adminId !== user.adminId) return res.status(403).json({msg:"Akses Terlarang"});
            await Users.update({username,email,password,android_id,expiry},{
                where:{
                    [Op.and]:[ { id:user.id },{ adminId: req.adminId } ]
                },
               });
        }
        res.status(200).json({msg:"User Berhasil di update"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }

}

const deleteUser = async(req,res)=>{
    try {
        const user = await Users.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!user) return res.status(404).json({msg:"User Tidak Di temukan"});
        if(req.role === "owner"){
           await Users.destroy({
            where:{
                id: user.id
            }
           });
        }else{
            if(req.adminId !== user.adminId) return res.status(403).json({msg:"Akses Terlarang"});
            await Users.destroy({
                where:{
                    [Op.and]:[ { id:user.id },{ adminId: req.adminId } ]
                },
               });
        }
        res.status(200).json({msg:"User Berhasil di Hapus"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}