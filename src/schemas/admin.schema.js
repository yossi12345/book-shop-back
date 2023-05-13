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
module.exports={
    deleteUserSchema,
    loginSchema
}