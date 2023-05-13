const express=require("express")
const router=express.Router()
const userController=require("../controllers/user.controller")
const authToken = require("../middlewares/authToken.middleware")
const validate = require("../middlewares/validate.middleware")
const { loginSchema, newUserSchema, deleteSchema, updateSchema } = require("../schemas/user.schema")

router.post("/logout",authToken(),userController.handleLogout)

router.post("/login",validate(loginSchema),userController.handleLogin)

router.post("/sign-up",validate(newUserSchema),userController.addNewUser)

router.delete("/delete-account",authToken(),validate(deleteSchema),userController.deleteUser)

router.patch("/update-account",authToken(),validate(updateSchema), userController.updateUser)


module.exports=router;