const Article = require("../models/Article")
const { articleValidator } = require("../helpers/validator")

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
        console.log(err)
        return res.status(400).json({
            status: "error",
            message: "wrong parameters",
        })
    }


    //ASIGN values to the object model -- manual or automatic
    //this is the automatic way-and the params are set automatic
    const article = new Article(params)

    /**manual is not escalable because if we send 50 params you will have to do this 1 by 1 
     * 
    article.title = params.title
    article.content = params.content
    article.title = params.title
    article.title = params.title
    */

    //SAVE  the article in the db

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

const findArticles = async (req, res) => {
    try {

        let query = Article
            .find({})
            .sort({ date: -1 }); //sort by newer post

        if (req.params.last) {
            query.limit(3); // Limit the number of objects shown
            //in this case if there's a /find/something , it will limit the res
        }

        const articulos = await query.exec();

        if (!articulos || articulos.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No articles were found",
            });
        }

        return res.status(200).send({
            status: "success",
            parameter_url: req.params.last,
            articles: articulos.length,
            articulos
        });

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "An error occurred while fetching articles",
        });
    }
}

const findOneArticle = async (req, res) => {

    try {
        //get an ID by url
        let id = req.params.id

        //find the article with the ID
        let query = await Article.findById(id).exec()

        //if it doesnt exist return error
        if (!query || query.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "No articles were found",
            });
        }

        //return the article

        return res.status(200).json({
            status: "success",
            query
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "An error occurred while fetching the article",
        });
    }

}

const deleteArticle = async (req, res) => {
    try {

        //get and Id 
        let article_id = req.params.id

        //find and delete by id the article
        let query = await Article.findOneAndDelete({ _id: article_id }).exec()

        //return error in case it doesnt exist
        if (!query || query.length === 0) {
            return res.status(404).json({
                status: "error",
                message: "We couldnt delete your article"
            })
        }

        //return success message

        return res.status(200).json({
            status: "success",
            article: query,
            message: "deleted bro..."
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "An error occurred while deleting the article",
        });
    }
}

const updateArticle = async (req, res) => {
    try {
        const article_id = req.params.id;
        const params = req.body;

        // Validar los datos
        try {
            articleValidator(params)
        } catch (error) {
            return res.status(400).json({
                status: "error",
                message: "wrong or missing parameters",
            })
        }

        const updatedArticle = await Article.findOneAndUpdate(
            { _id: article_id },
            params,
            { new: true } //we can return the new object updated
        ).exec();

        if (!updatedArticle) {
            throw new Error("Article not found or couldn't be updated")
        }

        res.status(200).json({
            status: "success",
            article: updatedArticle,
        });

    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "An error occurred while updating the article",
        });
    }
}

module.exports = {
    test,
    dataTest,
    create,
    findArticles,
    findOneArticle,
    deleteArticle,
    updateArticle
}