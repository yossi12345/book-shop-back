const jwt=require("jsonwebtoken")
async function generateToken(user,isAdmin){
    const tokenSecret=isAdmin?process.env.ADMIN_TOKEN_SECRET:process.env.USER_TOKEN_SECRET
    const token=jwt.sign(
        {
            _id:user._id,
            role:isAdmin?"admin":"user"
        },
        tokenSecret,
        {
            expiresIn:"6h"
        }
    )
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}
module.exports=generateToken