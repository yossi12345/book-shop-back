const Admin=require("../models/admin.model")
const User=require("../models/user.model")
const jwt=require("jsonwebtoken")
const verifyToken=(isAdmin=false)=>async(req,res)=>{
    console.log("SDFHHJ")
    const tokenSecret=isAdmin?process.env.ADMIN_TOKEN_SECRET:process.env.USER_TOKEN_SECRET
    try{
        console.log("1")
        const token=req.header("Authorization").replace("Bearer ","")
        const data=jwt.verify(token,tokenSecret)
        if (isAdmin){
            const admin=await Admin.findOne({
                _id:data._id,
                "tokens.token":token
            })
            if (!admin){
                return res.status(404).send(false)
            }
        }
        else{
            const user=await User.findOne({
                _id:data._id,
                "tokens.token":token
            })
            if (!user)
                return res.status(404).send(false)
        }
        res.send(true)
    }catch(err){
        console.log("#")
        res.status(404).send(err)
    }
}
module.exports=verifyToken