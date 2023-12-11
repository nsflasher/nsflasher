const Admins = require ("../models/AdminModel.js");

const verifyAdmin = async(req,res,next)=>{
    if(!req.session.adminId) {
        return res.status(401).json({msg:"Mohon Login Terlebih dahulu"});
    }
    const admin = await Admins.findOne({
        where:{
               uuid: req.session.adminId
            }
        });
    if(!admin) return res.status(404).json({msg:"Admin Tidak Di temukan"});  
    req.adminId = admin.id;
    req.role = admin.role;
    next();
}

const ownerOnly = async(req,res,next)=>{
    const admin = await Admins.findOne({
        where:{
               uuid: req.session.adminId
            }
        });
    if(!admin) return res.status(404).json({msg:"Admin Tidak Di temukan"}); 
    if(admin.role !== "owner") return res.status(403).json({msg:"Akses Terlarang"});
    next();
}

module.exports = {
    verifyAdmin,
    ownerOnly
}
