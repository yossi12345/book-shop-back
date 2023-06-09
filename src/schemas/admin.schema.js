const {object,string}=require("yup")
const loginSchema=object({
    body:object({
        username:string().required("username is required"),
        password:string().required("unable to login").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
            "unable to login"
        )
    })
})
const deleteUserSchema=object({
    body:object({
        password:string().required().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
            "wrong password"
        ),
        email:string().required("user email is required").email("this isn't a valid mail")
    })
})
const deleteAccountSchema=object({
    body:object({
        password:string().required("password is required").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
            "wrong password"
        ),
    })
})
const updateSchema=object({
    body:object({
        password:string().required("password is required").matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
            "wrong password"
        ),
        updates:object({
            username:string(),
            password:string().matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,
                "invalid password update"
            )
        })
    })
})
// const updateSchema=(req,res,next)=>{
//     const update=req.body.updates
//     const password=req.body.password
//     if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(password)))
//         return res.status(404).send("wrong password")
//     if (!Array.isArray(req.body.update))
//         return res.status(404).send("it need to be array with the update key and value")
//     const updatedVal=update[1]
//     switch(update[0]){ 
//         case 'password':
//             if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(updatedVal)))
//                 return res.status(404).send("invalid password update")
//             break
//         case 'username':
//             if (updatedVal==="")
//                 return res.status(404).send("invalid username update");
//             break
//         default:
//             return res.status(404).send("invalid update");
//     }
//     next()
// }
// const updateSchema=object({
//     body:object().shape({
//         password:string().required("password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,"wrong password"),
//         update:array().of(
//             mixed().oneOf(['password','username'], 'Invalid update')
//             .when('$0', {
//                     is: 'password',
//                     then: string().required('new Password is required').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/,"this isn't valid password for admin"),
//                 }).when('$0', {
//                     is: 'username',
//                     then: string().required('new username is required'),
//                 }
//             )
//         ).
//         required("an update required")
//     })
// })
module.exports={
    deleteUserSchema,
    loginSchema,
    updateSchema,
    deleteAccountSchema
}