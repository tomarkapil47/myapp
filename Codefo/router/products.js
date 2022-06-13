const router = require("express").Router();
const ErrorHaldler = require("../errors/ErrorHaldler");
const apikeyMiddleware =require("../middleware/apiKey")
let products= require("../productsData")
router.get("/products", (req, res) => {
    res.render("products", {
        title: "My Product Page"
    })
})

router.get("/api/products",(req,res)=>{
    res.json(products)
})
//Error handling with  class object
router.post("/api/products",(req,res,next)=>{
    // try{
    //     console.log(city);
    // } catch(err){
    //     next( ErrorHaldler.serverError(err.message))
    // }
    const {name,email}=req.body;
    if(!name || !email){
        next( ErrorHaldler.validationError())
        //throw new Error("All fields are required!"); just throw an error and pass the value from serverjs useing middleware
        // return res.status(422).json({error:"All fields are required!"})
    }
    const product={
        name,
        email,
        id:new Date().getTime().toString()
    }

    

    products.push(product)
    
    
    res.json(product)
})

// Delete an user with req.params id base
router.delete('/api/products/:productId',(req,res)=>{
    products= products.filter((product)=>req.params.productId !==product.id);
    res.json(products);

})


module.exports = router;