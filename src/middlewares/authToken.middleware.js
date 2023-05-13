const Admin=require("../models/admin.model")
const User=require("../models/user.model")
const jwt=require("jsonwebtoken")
const authToken=(isAdmin=false)=>async(req,res,next)=>{
    const tokenSecret=isAdmin?process.env.ADMIN_TOKEN_SECRET:process.env.USER_TOKEN_SECRET
    try{
        const token=req.header("Authorization").replace("bearer ","")
        const data=jwt.verify(token,tokenSecret)
        if (isAdmin){
            const admin=await Admin.findOne({
                _id:data._id,
                "tokens.token":token
            })
            if (!admin)
                throw new Error("autorization failed")
            req.admin=admin
            next()
        }
        const user=await User.findOne({
            _id:data._id,
            "tokens.token":token
        })
        if (!user)
            throw new Error("autorization failed")
        req.user=user
        next()
    }catch(err){
        res.status(400).send(err)
    }
}
module.exports=authToken