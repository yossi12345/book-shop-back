
const Book=require("../models/book.model")
const handleSearchBooks=async (req,res)=>{
    const sortby={}
    sortby[req.query.sort]=req.query.asending==="true"?1:-1
    const search=req.query.search
    try{
        const books=await Book.find({
            $or:[
                    {
                        name:search,
                        genre:req.query.genre
                    },
                    {
                        author:search,
                        genre:req.query.genre
                    }
                ]
        }).collation({locale:"he",caseLevel: false, numericOrdering: false})
        .sort(sortby).limit(5).skip(req.query.skip)

        handleBooksFind(res,books,"there is no books that matches to your search")
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
        handleBooksFind(res,book)
    } catch (err){
        console.log(err);
        res.status(500).send(err)
    }
}
const deleteBook=async (req,res)=>{
    try{
        const book=await Book.findByIdAndDelete(req.query._id)
        handleBooksFind(res,book)
    } catch(err){
        console.log(err);
        res.status(500).send(err)
    }
}
const getBook=async (req,res)=>{
    try{
        const book=await Book.findById(req.query._id)
        handleBooksFind(res,book)
    } catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
const handleAddingNewBook=async (req,res)=>{
    const book=new Book(req.body)
    try{
        await book.save()
        console.log(book)
        res.send(book)
    } catch (err){
        console.log(err);
        res.status(500).send(err,"oooooooo")
    }
}
async function handleBooksFind(res,book,unfindMessage="there is no book with this id"){
    if (!book){
        console.log("oops");
        return res.status(200).send(unfindMessage)
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