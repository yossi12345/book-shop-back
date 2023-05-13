
const Admin=require("../models/admin.model")
const User=require("../models/user.model")
const handleLogin=async (req,res)=>{
    try{
        const admin=await Admin.findOne({
            username:req.body.username
        })
        if (!admin)
            throw new Error("admin unable to login")
        const isPasswordMatch=await bcrypt.compare(req.body.password,admin.password)
        if (!isPasswordMatch)
            throw new Error("admin unable to login")
        await admin.generateToken()
        res.send({admin,token})
    } catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}
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
// const setDiscount=async (req,res)=>{
//     try{
//         const book=await Book.findByIdAndUpdate(req.body._id,
//             {
//                 discount:req.body.discount===0?undefined:req.body.discount
//             },
//             {
//                 new:true,
//                 runValidators:true
//             }
//         )
//         if (!book)
//             throw new Error("the book isn't found")
//         res.send(book)
//     } catch(err){
//         console.log(err)
//         res.status(500).send(err)
//     }
// }
module.exports={
    handleLogin,
    handleLogout,
    deleteUser
}