const express=require("express")
const router=express.Router()
const booksController=require("../controllers/books.controller")
const authToken = require("../middlewares/authToken.middleware")
const validate = require("../middlewares/validate.middleware")
const { searchSchema, idSchema, updateSchema, createBookSchema } = require("../schemas/book.schema")

router.get("/search",validate(searchSchema),booksController.handleSearchBooks)

router.get("/get",validate(idSchema),booksController.getBook)

router.delete("/delete-book",authToken(true),validate(idSchema), booksController.deleteBook)

router.patch("/update-book",authToken(true),validate(updateSchema), booksController.handleUpdateBook)

router.post("/new-book",authToken(true),validate(createBookSchema),booksController.handleAddingNewBook)

module.exports=router;