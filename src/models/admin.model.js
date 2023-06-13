const mongoose=require("mongoose")
const generateToken = require("./generateToken")
const bcrypt=require("bcryptjs")
const {ADMIN_PASSWORD_REGEX}=require("../global-contants")
const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        maxlength:12
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if (!ADMIN_PASSWORD_REGEX.test(value))
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