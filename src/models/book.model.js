const mongoose=require("mongoose")
const allGenres=[ 
    "פרוזה מקור","מתח ופעולה","רומן רומנטי",
    "רומן אירוטי","מדריכים ועצות",
    "היסטוריה ופוליטיקה","עיון"
]
const bookSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    author:{
        type:String,
        require:true,
        trim:true,
    },
    price:{
        type:Number,
        require:true,
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
        require:true
    },
    bookCover:{
        type:String,
        require:true
    },
    genre:{
        type:String,
        require:true,
        trim:true,
        validate(value){
            if (!allGenres.includes(value.trim()))
                throw new Error("this isn't a genre")
        },
    },
})
bookSchema.statics.getAllGenres=()=>{
    return allGenres
}
module.exports=mongoose.model("Book",bookSchema)