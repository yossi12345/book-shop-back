const express=require("express")
const router=express.Router()
const verifyToken=require("../controllers/verifyToken.controller")

router.get("/admin-verify-token",verifyToken(true))

router.get("/user-verify-token",verifyToken(false))

module.exports=router