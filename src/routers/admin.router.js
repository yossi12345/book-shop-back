const express=require("express")
const router=express.Router()
const adminController=require("../controllers/admin.controller")
const { loginSchema, updateSchema, deleteAccountSchema } = require("../schemas/admin.schema")
const validate= require("../middlewares/validate.middleware")
const authToken = require("../middlewares/authToken.middleware")

router.post("/admin-login",validate(loginSchema),adminController.handleLogin)

router.patch("/update-admin-account",authToken(true),validate(updateSchema),adminController.updateAdmin)

router.delete("/admin-delete-account",authToken(true),validate(deleteAccountSchema),adminController.deleteAccount)

router.post("/admin-logout",authToken(true),adminController.handleLogout)

router.post("/admin-sign-up",adminController.addNewAdmin)


module.exports=router;