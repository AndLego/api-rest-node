const { connection } = require("./database/connection")
const express = require("express")
const cors = require("cors")

//Run APP
console.log("running the APP")

//Connect to db
connection()

//Create Node server
const app = express()
const port = 3900

//cors configuration
/**we use a middleware to execute before everything
 * so the cors execute before the routes
 * 
 * app.use() creates routes or execute middlewares
 */

app.use(cors())

//Turn body into an js object
/**this middleware parses all the petitions in js objects */
app.use(express.json())//get data with content-type app/json
app.use(express.urlencoded({ extended: true })) //form url encoded

//CREATING ROUTES

//route
const article_route = require("./routes/Article")

//load the route

app.use("/api", article_route)


//hardcoded routes
app.get("/", (req, res) => {
    return res.status(200).send(`
    <h1>Creando una api </h1>
    `
    )
})

app.get("/test", (req, res) => {

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

})

//create server and listen https petitions
app.listen(port, () => {
    console.log(`Dancing on port ${port}`)
})