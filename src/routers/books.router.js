const express=require("express")
const router=express.Router()
const multer = require('multer');
const booksController=require("../controllers/books.controller")
const authToken = require("../middlewares/authToken.middleware")
const validate = require("../middlewares/validate.middleware")
const path = require('path');
const { searchSchema, idSchema, updateSchema, createBookSchema } = require("../schemas/book.schema")
const storage = multer.diskStorage({
    destination:"../front/public/book-images",
    filename: (_, file, callback) => {
      const filename =Date.now()+"-"+encodeURIComponent(file.originalname)
      callback(null, filename);
    },
});
const upload = multer({ 
     storage,
    fileFilter: (_, file, callback) => {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
        if (mimetype && extname) {
          return callback(null, true);
        }
    
        return callback(new Error('Only JPEG, JPG, and PNG file types are allowed.'));
    },
    limit:{
        fileSize:100*1024*1024
    } 
});


router.get("/search",validate(searchSchema),booksController.handleSearchBooks(false))

router.get("/get",validate(idSchema),booksController.getBook)

router.patch("/upload-book-cover",authToken(true),upload.single('bookCover'),booksController.handleUploadBookCover)

router.patch("/replace-book-cover",authToken(true),upload.single('bookCover'),booksController.handleEditBookCover)

router.delete("/delete-book",authToken(true),validate(idSchema), booksController.deleteBook)

router.patch("/update-book",authToken(true),validate(updateSchema), booksController.handleUpdateBook)

router.post("/new-book",authToken(true),validate(createBookSchema),booksController.handleAddingNewBook)

router.get("/admin-search",authToken(true),validate(searchSchema),booksController.handleSearchBooks(true))
module.exports=router;