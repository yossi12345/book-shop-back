const {object,string}=require("yup")
const {ADMIN_PASSWORD_REGEX}=require("../global-contants")
const loginSchema=object({
    body:object({
        username:string().required("username is required"),
        password:string().required("unable to login").matches(
            ADMIN_PASSWORD_REGEX,
            "unable to login"
        )
    })
})
const deleteAccountSchema=object({
    body:object({
        password:string().required("password is required").matches(
            ADMIN_PASSWORD_REGEX,
            "wrong password"
        ),
    })
})
const updateSchema=object({
    body:object({
        password:string().required("password is required").matches(
            ADMIN_PASSWORD_REGEX,
            "wrong password"
        ),
        updates:object({
            username:string(),
            password:string().matches(
                ADMIN_PASSWORD_REGEX,
                "invalid password update"
            )
        })
    })
})
module.exports={
    loginSchema,
    updateSchema,
    deleteAccountSchema
}