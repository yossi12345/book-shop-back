const {object,string, number}=require("yup")
const Book = require("../models/book.model")
const idSchema=object({
    query:object({
        _id:string().length(24,"wrong id")
    })
})
const searchSchema=object({
    query:object({
        search:string(),
        sort:string().oneOf(["name","author","genre"]),
        skip:number().min(0),
        asending:string().oneOf([["true","false"]]),
        genre:string().oneOf(Book.getAllGenres())
    })
})
const createBookSchema=object({
    body:object({
        price:number().min(0).required(),
        name:string().required(),
        author:string().required(),
        firstChapter:string(),
        discount:number().min(0).max(100),
        bookCover:string().required(),
        description:string().required(),
        genre:string().required().oneOf(Book.getAllGenres())
    })
})
const updateSchema=object({
    query:object({
        _id:string().length(24,"wrong id")
    }),
    body:object({
       price:number().min(0),
       name:string(),
       discount:number().min(0).max(100),
       bookCover:string(),
       genre:string().oneOf(Book.getAllGenres())
    }),
})
module.exports={
   idSchema,
   updateSchema,
   createBookSchema,
   searchSchema
}