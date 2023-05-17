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
    body:object().shape({
        password:string().required("password is required").min(8,loginFailedMessage).max(20,loginFailedMessage),
        update:array().of(
            mixed().oneOf(['password', 'age', 'username', 'email'], 'Invalid update')
            .when('$0', {
                    is: 'password',
                    then: string().required('new Password is required').min(8).max(20),
                }).when('$0', {
                    is: 'age',
                    then: number().min(4).max(120).required('new age is required'),
                }).when('$0', {
                    is: 'username',
                    then: string().required('new username is required'),
                }).when('$0', {
                    is: 'email',
                    then: string().email('Invalid email address').required('new email is required'),
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



