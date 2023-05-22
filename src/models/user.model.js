
const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const generateToken=require("./generateToken")
const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            trim:true
        },
        age:{
            type:Number,
            required:true,
            min:4,
            max:120
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validate(value){
                if (!validator.isEmail(value))
                    throw new Error("this isn't email")
            }
        },
        password:{
            type:String,
            required:true,
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
    },
    {
        timestamps:true
    }
)
userSchema.methods.generateToken=async function(){
    const token=await generateToken(this,false)
    return token
}
userSchema.pre("save",async function (next){
    if (this.isModified("password"))
        this.password=await bcrypt.hash(this.password,8)
    next()
})
module.exports=mongoose.model("User",userSchema)