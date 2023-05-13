const {object,string, number}=require("yup")
const idSchema=object({
    query:object({
        _id:string().length(24,"wrong id")
    })
})
const searchSchema=object({
    query:object({
        search:string().required()
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
        genre:string().required().oneOf([
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
        ])
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
       genre:string().oneOf([
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
        ])
    }),
})
module.exports={
   idSchema,
   updateSchema,
   createBookSchema,
   searchSchema
}