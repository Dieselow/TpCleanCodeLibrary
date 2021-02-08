const BookController = require("../controller").BookController;
const Book = require("../domain/entity/book");
const bodyParser = require("body-parser");
module.exports = function (app) {
    app.get('/books', async (request, response) => {
        try {
            let books = await BookController.getBooks();
            response.status(200).json(books);
        } catch (e) {
            response.status(500).json(`Error while retrieving books ${e.message}`);
        }
    });

    app.post("/books", bodyParser.json(), async (request, response) => {
        try {
            if (request.body.title && request.body.author) {
                let book = await BookController.createBook(new Book(request.body.title, request.body.author));
                response.status(201).json(book);
            } else {
                response.status(400).json(`bad params`);
            }
        } catch (e) {
            response.status(500).json(`Error while creating book ${e.message}`);
        }
    })
}
