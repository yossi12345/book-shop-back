const {object,string,number,mixed,array}=require("yup")
const loginFailedMessage="unable to login"
const loginSchema=object({
    body:object().shape({
        email:string().required("email is required").email(loginFailedMessage),
        password:string().required("password is required").min(8,loginFailedMessage).max(20,loginFailedMessage)
    })
})
const deleteSchema=object({
    body:object({
        password:string().required("password is required").min(8,loginFailedMessage).max(20,loginFailedMessage)
    })
})
const updateSchema=object({
    body:object({
        password:string().min(8,"wrong password").max(20,"wrong password"),
        updates:object({
            email:string().email("invalid email update"),
            username:string(),
            password:string().min(8,"invalid password update").max(20,"invalid password update")
        })
    })
})
// const updateSchema=(req,res,next)=>{
//     const update=req.body.update
//     const password=req.body.password
//     if (password.length<8||password.length>20)
//         return res.status(404).send("wrong password")
//     if (!Array.isArray(req.body.update))
//         return res.status(404).send("it need to be array with the update key and value")
//     const updatedVal=update[1]
//     switch(update[0]){ 
//         case 'password':
//             if (updatedVal.length<8||updatedVal.length>20)
//                 return res.status(404).send("invalid password update")
//             break
//         case 'username':
//             if (updatedVal==="")
//                 return res.status(404).send("invalid username update");
//             break
//         case 'email':
//             if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatedVal)))
//                 return res.status(404).send("invalid email update");
//             break
//         default:
//             return res.status(404).send("invalid update");
//     }
//     next()
// }
// const updateSchema=object({
//     body:object().shape({
//         password:string().required("password is required").min(8,loginFailedMessage).max(20,loginFailedMessage),
//         update:array().of(
//             mixed().test('updateValidation', 'Invalid update field', function (value) {
//                 const updateType = value[0];
//                 const updateValue = value[1];
      
//                 switch (updateType) {
//                   case 'password':
//                     return this.schema.fields.password.required('New password is required').min(8).max(20).isValidSync(updateValue);
//                   case 'username':
//                     return this.schema.fields.username.required('New username is required').isValidSync(updateValue);
//                   case 'email':
//                     return this.schema.fields.email.email('Invalid email address').required('New email is required').isValidSync(updateValue);
//                   default:
//                     return false;
//                 }
//             })
//         ).
//         required("an update required")
//     })
// })
const newUserSchema=object({
    body:object({
        username:string().required("username is required"),
        age:number().required("age is required").min(4).max(120),
        email:string().required('email is required').email('Invalid email address'),
        password:string().required("password is required")
            .min(8,"the password need to contain at least 8 and less than 20 characters")
            .max(20,"the password need to contain at least 8 and less than 20 characters")
    })
})
module.exports={
    deleteSchema,
    loginSchema,
    newUserSchema,
    updateSchema
}



  

