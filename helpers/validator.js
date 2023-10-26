const validator = require("validator")

/**method to validate */
const articleValidator = (params) => {
    let title = !validator.isEmpty(params.title) && validator.isLength(params.title, { min: 5, max: undefined })
    let content = !validator.isEmpty(params.content)

    if (!title || !content) {
        throw new Error("we couldnt validate the data")
    }
}

module.exports = {
    articleValidator
}