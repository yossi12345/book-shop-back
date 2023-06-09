
const Admin=require("../models/admin.model")
const User=require("../models/user.model")
const bcrypt=require("bcryptjs")
const handleLogin=async (req,res)=>{
    try{
        const admin=await Admin.findOne({
            username:req.body.username
        })
        if (!admin)
            return res.status(404).send("admin unable to login")
        const isPasswordMatch=await bcrypt.compare(req.body.password,admin.password)
        if (!isPasswordMatch)
            return res.status(404).send("admin unable to login")
        const token=await admin.generateToken()
        res.send({
            token,
            username:admin.username
        })
    } catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}
const updateAdmin=async (req,res)=>{
    try{
        const isPasswordMatch=await bcrypt.compare(req.body.password,req.admin.password)
        if (!isPasswordMatch)
            return res.status(404).send("wrong password")
        const updates=req.body.updates
        if (updates.username){
            const adminWithSameUsername=await Admin.findOne({username:updates.username})
            if (adminWithSameUsername)
                return res.status(401).send("this username already exists in the db")
        }
        for (const key in updates){
            req.admin[key]=updates[key]
        }
        await req.admin.save()
        res.send(req.admin)
    } catch(err){
        console.log(err)
        // if (key==="username"&&err.code===11000)
        //     return res.status(401).send("this username already exists in the db")
        res.status(500).send(err)
    }
}
// const addNewAdmin=async (req,res)=>{
//     const admin=new Admin(req.body)
//     try{
//         await admin.save()
//         res.send(admin)
        
//     } catch (err){
//         console.log(err);
//         if (err.code===11000)
//             return res.status(404).send("this username already exists in the db")
//         res.status(500).send(err)
//     }
// }
const deleteUser=async (req,res)=>{
    try{
        const isPasswordMatch=await bcrypt.compare(req.body.password,req.admin.password)
        if (!isPasswordMatch)
            throw new Error("wrong password")
        const user=await User.findOne({email:req.body.email})
        if (!user)
            res.status(404).send("the user isn't found")
        console.log(user)  
        await user.remove()
        res.send(user)
    } catch (err){
        console.log(err);
        res.status(500).send(err)
    }
}
const deleteAccount=async (req,res)=>{
    try{
        const isPasswordMatch=await bcrypt.compare(req.body.password,req.admin.password)
        if (!isPasswordMatch)
            return res.status(401).send("wrong password")
        
        req.admin.deleteOne() 
        res.send(req.admin)
    } catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}

const handleLogout=async (req,res)=>{
    try{
        const token=req.header("Autorization").replace("Bearer ","")
        req.admin.tokens=req.admin.tokens.filter((tokenDoc)=>tokenDoc!==token)
        await req.admin.save()
        res.send("the admin logout successfully")
    } catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}
module.exports={
    handleLogin,
    handleLogout,
    deleteUser,
    updateAdmin,
    deleteAccount
    //addNewAdmin
}