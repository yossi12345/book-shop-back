const jwt=require("jsonwebtoken")
async function generateToken(user,tokenSecret){
    const token=jwt.sign(
        {
            _id:user._id
        },
        tokenSecret,
        {
            expiresIn:"6h"
        }
    )
    user.tokens=user.tokens.concat({token})
    await user.save()
}
module.exports=generateToken