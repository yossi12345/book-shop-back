const express=require("express")
const router=express.Router()
const adminController=require("../controllers/user.controller")
const { loginSchema,deleteUserSchema } = require("../schemas/admin.schema")
const validate= require("../middlewares/validate.middleware")
const authToken = require("../middlewares/authToken.middleware")

router.post("/admin-login",validate(loginSchema),adminController.handleLogin)

router.delete("/admin-delete-user",authToken(true),validate(deleteUserSchema),adminController.deleteUser)

// router.post("/set-discount",adminController.setDiscount)

router.post("/admin-logout",authToken(true),adminController.handleLogout)


module.exports=router;