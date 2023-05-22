const mongoose=require("mongoose")
const generateToken = require("./generateToken")
const bcrypt=require("bcryptjs")
const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        validate(value){
            const regex=/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$/
            if (!regex.test(value))
                throw new Error("the password requires at least one uppercase letter, one lowercase letter, one digit, one special character, and a minimum length of 8 characters.")
        }
    },
    tokens:{
        type:[
            {
                token:{
                    type:String,
                    required:true
                }
            }
        ]
    }
})
adminSchema.methods.generateToken=async function(){
    const token=await generateToken(this,true)
    return token
}
adminSchema.pre("save",async function (next){
    if (this.isModified("password")){
        this.password=await bcrypt.hash(this.password,12)
    }
    next()
})
module.exports=mongoose.model("Admin",adminSchema)