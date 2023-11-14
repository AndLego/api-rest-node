# api-rest-node

This is the API // BE for a blog project.
Run your mongod.exe for server.
npm start at project.

CURRENT FEATURES

POST    /create to create new articles
GET     /articles in order to get All the articles

GET     /article/:id to get one article by ID
DELETE  /article/:id if you want to delete an article
PUT     /article/:id to update the article
            send body urlencoded with the parameters

POST    /uploadImage/:id to upload and image to a current article
GET     /image/:fichero in order to get the image by the filename

GET     /getQuery/:query to make a query in all the DB
            this query is made with OR to return all the matching content

