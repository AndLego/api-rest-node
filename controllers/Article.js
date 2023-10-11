const validator = require("validator")

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

const create = (req, res) => {

    //take data per post
    let params = req.body

    //validate data
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


    //asign values to the object model

    //return result


    return res.status(200).json({
        message: "new article created",
        params
    })
}


module.exports = {
    test,
    dataTest,
    create
}