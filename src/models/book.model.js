const mongoose=require("mongoose")
const {GENRES}=require("../global-contants")
const bookSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
        trim:true,
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    discount:{
        type:Number,
        min:0,
        max:100
    },
    firstChapter:{
        type:String
    },
    description:{
        type:String,
        required:true
    },
    bookCover:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if (!GENRES.includes(value.trim()))
                throw new Error("this isn't a genre")
        },
    },
    available:{
        type:Boolean,
        default:true
    }
})
module.exports=mongoose.model("Book",bookSchema)