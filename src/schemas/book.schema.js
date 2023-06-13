const {object,string, number}=require("yup")
const { GENRES }=require("../global-contants")
const idSchema=object({
    query:object({
        _id:string().length(24,"wrong id").required()
    })
})
const searchSchema=object({
    query:object({
        search:string(),
        sort:string().oneOf(["name","author","genre"]),
        page:number().min(1),
        asending:string().oneOf(["true","false"]),
        genre:string().oneOf(GENRES)
    })
})
const createBookSchema=object({
    body:object({
        price:number().min(0).required(),
        name:string().required(),
        author:string().required(),
        firstChapter:string(),
        discount:number().min(0).max(100),
        description:string().required(),
        genre:string().required().oneOf(GENRES)
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
       genre:string().oneOf(GENRES)
    }),
})
module.exports={
   idSchema,
   updateSchema,
   createBookSchema,
   searchSchema
}