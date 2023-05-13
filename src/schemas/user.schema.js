const {object,string,number,mixed}=require("yup")
const loginFaildMessage="unable to login"
const loginSchema=object({
    body:object({
        email:string().required("email is required").email(loginFaildMessage),
        password:string().required("password is required").min(8,loginFaildMessage).max(20,loginFaildMessage)
    })
})
const deleteSchema=object({
    body:object({
        password:string().required("password is required").min(8,loginFaildMessage).max(20,loginFaildMessage)
    })
})
const updateSchema=object({
    body:object({
        password:string().required("password is required").min(8,loginFaildMessage).max(20,loginFaildMessage),
        update:array().of(
            mixed().oneOf(['password', 'age', 'username', 'email'], 'Invalid update')
            .when([0], {
                    is: 'password',
                    then: yup.string().required('new Password is required').min(8).max(20),
                }).when([0], {
                    is: 'age',
                    then: yup.number().min(4).max(120).required('new age is required'),
                }).when([0], {
                    is: 'username',
                    then: yup.string().required('new username is required'),
                }).when([0], {
                    is: 'email',
                    then: yup.string().email('Invalid email address').required('new email is required'),
                }
            )
        ).
        required("an update required")
    })
})
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



