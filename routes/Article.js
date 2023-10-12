const express = require("express")
const router = express.Router()

//we load the controllerand then use it on the route

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
module.exports = router