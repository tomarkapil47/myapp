

const router = require("express").Router();
router.get("/", (req, res) => {
    res.render("index", {
        title: "My Home Page"
    })
})


router.get("/about", (req, res) => {
    res.render("about", {
        title: "My About Page"
    })
})

router.get("/download", (req, res) => {
    res.download(path.resolve(__dirname) + "/about.html")
})
// router.get("/api/products", apiKeyMiddleware,(req, res) => {
//    res.json([
//        {
//            id:"1234",
//            name:"Chrome"
//        },
//        {
//            id:"123456",
//            name:"FireFox"
//        }
//    ])
// })




module.exports = router;