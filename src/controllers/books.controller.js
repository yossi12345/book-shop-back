
const Book=require("../models/book.model")
const handleSearchBooks=(isAdmin)=>async (req,res)=>{
    const sortby={}
    sortby[req.query.sort]=req.query.asending==="true"?1:-1
    const findByName={}
    //const findByAuthor={}
    const search=req.query.search
    const genre=req.query.genre
    if (!isAdmin){
        findByName.available=true
        //findByAuthor.available=true
    }
    if (search){
        findByName.name={$regex:new RegExp(search,"i")}
        //findByAuthor.author={$regex:new RegExp(search,"i")}
    }
    if (genre){
        findByName.genre=genre
        //findByAuthor.genre=genre
    }
    const skip=(req.query.page-1)*6
    try{
        const books=await Book.find({findByName
        }).collation({locale:"en",strength:2})
        .sort(sortby).limit(7).skip(skip)
        if (books.length===0){
            console.log("oops")
            return res.status(404).send("there is no books that matches to your search")
        }
        console.log(books)
        const isThereMoreBooks=books.length===7
        if (isThereMoreBooks)
            books.pop()
        res.send({
            books,
            isThereMoreBooks
        })
    } catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}
const handleUpdateBook=async (req,res)=>{
    try{
        const book=await Book.findByIdAndUpdate(req.query._id,req.body,{
            new:true,
            runValidators:true
        })
        handleBookFind(res,book)
    } catch (err){
        console.log(err);
        res.status(500).send(err)
    }
}
const deleteBook=async (req,res)=>{
    try{
        const book=await Book.findByIdAndDelete(req.query._id)
        handleBookFind(res,book)
    } catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}
const getBook=async (req,res)=>{
    try{
        const book=await Book.findById(req.query._id)
        handleBookFind(res,book)
    } catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
const handleAddingNewBook=async (req,res)=>{
    const book=new Book(req.body)
    try{
        await book.save()
        console.log("qwertyu",book)
        res.send(book)
    } catch (err){
        console.log("cdfvgbhnjm",err)
        res.status(500).send(err)
    }
}
async function handleBookFind(res,book,unfindMessage="there is no book with this id"){
    if (!book){
        console.log("oops")
        return res.status(404).send(unfindMessage)
    }
    console.log(book)  
    res.send(book)
}
module.exports={
    handleAddingNewBook,
    handleSearchBooks,
    handleUpdateBook,
    deleteBook,
    getBook
}