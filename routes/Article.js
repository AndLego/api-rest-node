const express = require("express")
const multer = require("multer")

const router = express.Router()

const storage = multer.diskStorage({
    //cb is like a hook that let us save or modify the file
    destination: (req, file, cb) => {
        cb(null, "./images/articles")
    },
    filename: (req, file, cb) => {
        cb(null, `article${Date.now()}${file.originalname}`)
    }
})

//middleware to upload using multer(personal)
const upload = multer({ storage: storage })

//we load the controller and then use it on the route
const ArticleController = require("../controllers/Article")


//test routes
router.get("/test-article", ArticleController.test)
router.get("/test-data", ArticleController.dataTest)

//util routes
router.post("/create", ArticleController.create)
router.get("/articles/:last?", ArticleController.findArticles)
///:last? gives the option to send an optional parameter for filtering goals
router.get("/article/:id", ArticleController.findOneArticle)
router.delete("/article/:id", ArticleController.deleteArticle)
router.put("/article/:id", ArticleController.updateArticle)
router.post("/uploadImage/:id", [upload.single("file0")], ArticleController.uploadImage)
router.get("/image/:fichero", ArticleController.getImage)
router.get("/getQuery/:query", ArticleController.getQuery)


module.exports = router