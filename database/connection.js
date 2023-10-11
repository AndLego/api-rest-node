const mongoose = require("mongoose")

const connection = async () => {

    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog")

        //in case we get errors adn advice we should send parameteres ::  "mongodb://localhost:27017/mi_blog", {}
        //we can use the next parameteres:
        //useNewUrlParser: true
        //useUnifiedTopology: true
        //useCreateIndex: true

        console.log("Running and Dancing on DB")

    } catch (err) {
        console.error(err)
        throw new Error("OOP!, something went wrong, couldnt connect to the db")
    }

}

module.exports = {
    connection
}

/**
 * en js usamos import en node usamos require
 * asi mismo usamos export en js y aca usamos module.exports
 */