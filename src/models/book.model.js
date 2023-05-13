const mongoose=require("mongoose")
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
        minlength:1
    },
    price:{
        type:Number,
        require:true,
        min:0
    },
    discount:{
        typee:Number,
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
            const genres=[
                "פרוזה מקור","פרוזה תרגום",
                "מתח ופעולה","רומן רומנטי",
                "רומן אירוטי","עיון",
                'מד"ב ופנטזיה',"ילדים ונוער",
                "פעוטות","ילדי גן",
                "ראשית קריאה","נוער צעיר",
                "נוער בוגר","שואה",
                "יהדות","מדריכים ועצות",
                "עסקים וניהול","היסטוריה ופוליטיקה",
                "ביוגרפיה","בריאות",
                "פסיכולוגיה","הורות וזוגיות",
                "הגות ופילוסופיה","רוחניות",
                "טיולים ופנאי","בישול",
                "שירה","מדע ורפואה"
            ]
            if (!genres.includes(value.trim()))
                throw new Error("this isn't a genre")
        },
    },
})
module.exports=mongoose.model("Book",bookSchema)