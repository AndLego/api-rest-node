const validator = require("validator")
const Article = require("../models/Article")

const test = (req, res) => {
    return res.status(200).json({
        message: "i'm a test action for the article controller"
    })
}

const dataTest = (req, res) => {
    console.log("test is working")
    /**this way we can send json s */
    return res.status(200).json([
        {
            tituo: "hola",
            tema: "una api"
        },
        {
            tituo: "hola",
            tema: "una api"
        }
    ])
}

const create = async (req, res) => {

    //TAKE data per post
    let params = req.body

    //VALIDATE data
    /**we use the package validator to validate the data
     * as this method can give errors we use try/catch
     */

    try {

        let title = !validator.isEmpty(params.title) && validator.isLength(params.title, { min: 5, max: undefined })
        let content = !validator.isEmpty(params.content)

        if (!title || !content) {
            throw new Error("we couldnt validate the data")
        }

    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: "wrong parameters",
        })
    }


    //ASIGN values to the object model -- manual or automatic
    //this is the automatic way-and the params are set automatic
    const article = new Article(params)

    /**manual is nor escalable because if we send 50 params you will have to do this 1 by 1 */
    //article.title = params.title
    //article.title = params.title
    //article.title = params.title
    //article.title = params.title

    //SAVE  the areticle in the db

    try {
        // SAVE the article in the database
        const articleSaved = await article.save();
        return res.status(200).json({
            status: "success",
            article: articleSaved,
            message: "Article was saved"
        });
    } catch (error) {
        return res.status(400).json({
            status: "error",
            message: "The article was NOT saved",
        });
    }
}

const findArticle = async (req, res) => {
    try {
        const articulos = await Article.find({}).exec();

        if (!articulos || articulos.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No articles were found",
            });
        }

        return res.status(200).send({
            status: "success",
            articulos
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "An error occurred while fetching articles",
        });
    }
}



module.exports = {
    test,
    dataTest,
    create, 
    findArticle
}