const express=require("express")
const cors=require("cors")
const helmet=require("helmet")
const booksRouter=require("./routers/books.router")
const userRouter=require("./routers/user.router")
const adminRouter=require("./routers/admin.router")
const verifyTokenRouter=require("./routers/verifyToken.router")

const app=express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(helmet())
 

app.use(express.json());


app.get('/',async (_,res)=>{res.send("Node.js server")})


app.use(booksRouter)
app.use(userRouter)
app.use(adminRouter)
app.use(verifyTokenRouter)

app.all("*",async (_,res)=>{
    res.status(404).send({
        success:false,
        statusCode:404,
        statusText:"Not Found",
        message:"nothing to see here",
    })
})
module.exports=app