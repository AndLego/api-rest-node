const express = require("express")
const router = express.Router()

//we load the controllerand then use it on the route

const ArticleController = require("../controllers/Article")

//test routes
router.get("/test-article", ArticleController.test)
router.get("/test-data", ArticleController.dataTest)

//util routes
router.post("/create", ArticleController.create)

module.exports = router