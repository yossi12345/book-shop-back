
const mongoose=require("mongoose")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            require:true,
            trim:true
        },
        age:{
            type:Number,
            require:true,
            min:4,
            max:120
        },
        email:{
            type:String,
            require:true,
            unique:true,
            validate(value){
                if (!validator.isEmail(value))
                    throw new Error("this isn't email")
            }
        },
        password:{
            type:String,
            require:true,
            minlength:8,
            maxlength:20
        },
        tokens:{
            type:[
                {
                    token:{
                        type:String,
                        require:true
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
    await generateToken(this,process.env.USER_TOKEN_SECRET)
}
userSchema.pre("save",async function (next){
    if (this.isModified("password"))
        this.password=await bcrypt.hash(this.password,8)
    next()
})
module.exports=mongoose.model("User",userSchema)