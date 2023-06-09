const validate=(schema)=>async (req,res,next)=>{
    console.log(req.body)
    try{
        await schema.validate({
            body:req.body,
            query:req.query,
            params:req.params
        })
        next()
    } catch(err){
        console.log("schema validate failed");
        res.status(404).send(err)
    }
}
module.exports=validate