
const User=require("../models/user.model")
const bcrypt=require("bcrypt")
// const jwt=require("jsonwebtoken")
const handleLogout=async (req,res)=>{
    try{
        const token=req.header("Autorization").replace("Bearer ","")
        req.user.tokens=req.user.tokens.filter((tokenDoc)=>tokenDoc!==token)
        await req.user.save()
        res.send("the user logout successfully")
    } catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}
const handleLogin=async (req,res)=>{
    try{
        const user=await User.findOne({email:req.body.email})
        if (!user)
            throw new Error("unable to login")
        const isPasswordMatch=await bcrypt.compare(req.body.password,user.password)
        if (!isPasswordMatch)
            throw new Error("unable to login")
        await user.generateToken()
        req.send({user,token})
    } catch (err){
        console.log(err);
        res.status(500).send(err)
    }
}
const deleteUser=async (req,res)=>{
    try{
        const isPasswordMatch=await bcrypt.compare(req.body.password,req.user.password)
        if (!isPasswordMatch)
            throw new Error("wrong password")
        req.user.remove() 
        res.send(req.user)
    } catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}
const updateUser=async (req,res)=>{
    try{
        const isPasswordMatch=await bcrypt.compare(req.body.password,req.user.password)
        if (!isPasswordMatch)
            throw new Error("wrong password")
        const [key,update]=req.body.update
        req.user[key]=update
        await req.user.save()
        res.send(req.user)
    } catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
const addNewUser=async (req,res)=>{
    const user=new User(req.body)
    try{
        await user.generateToken()
        console.log(user)
        res.send(user)
    } catch (err){
        console.log(err);
        res.status(500).send(err)
    }
}
// async function generateUserToken(user,tokenSecret){
//     const token=jwt.sign(
//         {
//             _id:user._id
//         },
//         tokenSecret,
//         {
//             expiresIn:"6h"
//         }
//     )
//     user.tokens=user.tokens.concat({token})
//     await user.save()
// }
module.exports={
    addNewUser,
    handleLogin,
    handleLogout,
    deleteUser,
    updateUser
}