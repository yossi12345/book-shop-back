
const User=require("../models/user.model")
const bcrypt=require("bcryptjs")
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
        if (!user){
            console.log("5555")
            return res.status(404).send("unable to login")
        }
        const isPasswordMatch=await bcrypt.compare(req.body.password,user.password)
        if (!isPasswordMatch){
            console.log("6666")
            return res.status(404).send("unable to login")
        }
        const token=await user.generateToken()
        res.send({
            token,
            username:user.username
        })
    } catch (err){
        console.log(err);
        res.status(500).send(err)
    }
}
const deleteAccount=async (req,res)=>{
    try{
        const isPasswordMatch=await bcrypt.compare(req.body.password,req.user.password)
        if (!isPasswordMatch)
            return res.status(404).send("wrong password")
        
        req.user.deleteOne() 
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
            return res.status(404).send("wrong password")
        const updates=req.body.updates
        if (updates.email){
            const userWithSameEmail=await User.findOne({email:updates.email})
            if (userWithSameEmail)
                return res.status(401).send("this email already exists in the db")
        }
        for (const key in updates){
            req.user[key]=updates[key]
        }
        await req.user.save()
        res.send(req.user)
    } catch(err){
        console.log(err)
        // if (key==="email"&&err.code===11000)
        //     return res.status(401).send("this email already exists in the db")
        res.status(500).send(err)
    }
}
const addNewUser=async (req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
        const token=await user.generateToken()
        res.send({
            token,
            username:user.username
        })
    } catch (err){
        console.log(err);
        if (err.code===11000)
            return res.status(401).send("this email already exists in the db")
        res.status(500).send(err)
    }
}
module.exports={
    addNewUser,
    handleLogin,
    handleLogout,
    deleteAccount,
    updateUser
}