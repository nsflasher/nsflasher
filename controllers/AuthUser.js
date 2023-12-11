const Users = require("../models/UserModel.js");

const user_login = async(req,res)=>{
    try {
        const user = await Users.findOne({
            where:{
                   email: req.body.email,
                   password: req.body.password
                }
            });
        if(!user) return res.status(404).json({msg:"User Tidak Di temukan"});
        req.session.userId = user.uuid;
        const uuid = user.uuid;
        const email = user.email;
        const android_id = user.android_id;
        const expiry = user.expiry;
        var date = new Date(req.body.date);
        if(req.body.android_id !== android_id ){
            return res.status(403).json({msg:"Device Tidak Sesuai"});
        }else if(date >= expiry){
            return res.status(403).json({msg:"Masa Aktif telah berakhir"});
        }else{
            res.status(200).json({
                data: { uuid, email, android_id, expiry },
                msg:"Berhasil Login"
            });
        }
    } catch (error) {
        res.status(500).json({msg:error.message});
    }
}

const user_verify = async (req,res)=>{
    if(!req.session.userId){
        return res.status(401).json({msg:"Mohon Login Terlebih dahulu"});
    }
    const user = await Users.findOne({
        attributes:['uuid','email','android_id','expiry'],
        where:{
               uuid: req.session.userId
            }
        });
    if(!user) return res.status(404).json({msg:"User Tidak Di temukan"});
    res.status(200).json(user);
}

const user_logout = async(req,res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg:"Tidak Dapat logout"});
        res.status(200).json({msg:"Anda telah berhasil logout"});
    });

}

module.exports = {
    user_login,
    user_verify,
    user_logout
}