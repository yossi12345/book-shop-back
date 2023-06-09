
const Book=require("../models/book.model")
const fs=require("fs")
const handleSearchBooks=(isAdmin)=>async (req,res)=>{
    const sortby={}
    sortby[req.query.sort]=req.query.asending==="true"?1:-1
    const findByName={}
    const search=req.query.search
    const genre=req.query.genre
    if (!isAdmin){
        findByName.available=true
    }
    if (search){
        findByName.name={$regex:new RegExp(search,"i")}
    }
    if (genre){
        findByName.genre=genre
    }
    const skip=(req.query.page-1)*6
    try{
        const books=await Book.find(findByName)
        .collation({locale:"en",strength:2})
        .sort(sortby).limit(6).skip(skip)
        if (books.length===0){
            console.log("oops")
            return res.status(404).send("there is no books that matches to your search")
        }
        const amountOfBooks=await Book.countDocuments(findByName)
        console.log(books,amountOfBooks)
        res.send({
            books,
            amountOfBooks
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
const handleUploadBookCover=async (req,res)=>{
    try{
        const book=await Book.findById(req.query._id)
        book.bookCover="/book-images/"+req.file.filename
        await book.save()
        res.send(book)
    }catch (err){
        console.log(err)
        res.status(404).send("לא הצלחנו לשמור את התמונה")
    }
}
const handleEditBookCover=async (req,res)=>{
    try{
        const book=await Book.findById(req.query._id)
        fs.unlink("../front/public"+book.bookCover,()=>{})
        book.bookCover="/book-images/"+req.file.filename
        await book.save()
        res.send(book)
    }catch (err){
        console.log(err)
        res.status(404).send("לא הצלחנו לערוך את התמונה")
    }
}
const deleteBook=async (req,res)=>{
    try{
        const book=await Book.findByIdAndDelete(req.query._id)
        if (book)
            fs.unlink("../front/public"+book.bookCover,()=>{})
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
    req.body.bookCover="/book-images/no-book-cover.PNG"
    const book=new Book(req.body)
    try{
        await book.save()
        console.log("body",book)
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
    getBook,
    handleEditBookCover,
    handleUploadBookCover
}