const express = require("express")
const path = require("path")
const ErrorHaldler = require("./errors/ErrorHaldler")

const app = express()
const MainRouter = require("./router/index")
const productRouter= require("./router/products")
app.set("view engine", "ejs");
console.log(app.get('view engine'))

console.log(app.get('views'))
app.use(express.static("public"))
app.use(express.json());
app.use(productRouter)
app.use(MainRouter)
// global middleware
app.use((req,res,next)=>{
    return res.json({
        message :"Page not found"  //for not for (error not found)=>error handling
    })

});

// Error handling middleware
app.use((err,req,res,next)=>{
    if(err instanceof ErrorHaldler){
        res.status(422).json({     //Eror handling with status 
            error:{
                message:err.message,
                status:err.status
            }
        })
    }else{
        res.status(500).json({
            error:{
                message:err.message,
                status:err.status
            }
        })
    }
  console.log('Error',err.message)

 
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`serer is runnig on port ${PORT}`))