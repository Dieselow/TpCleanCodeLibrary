const BookController = require("../controller").BookController;
const UserController = require("../controller").UserController;
const Book = require("../domain/entity/book");
const bodyParser = require("body-parser");
const userMiddleware = require("../middleware").UserMiddleware;
module.exports = function (app) {
    app.get('/books', async (request, response) => {
        try {
            let books = await BookController.getBooks();
            response.status(200).json(books);
        } catch (e) {
            response.status(500).json(`Error while retrieving books ${e.message}`);
        }
    });

    app.post("/books", userMiddleware.librarianAuth(), bodyParser.json(), async (request, response) => {
        try {
            if (request.body.title && request.body.author) {
                let book = await BookController.createBook(new Book(request.body.title, request.body.author));
                return response.status(201).json(book);
            }
            return response.status(400).json(`bad params`);
        } catch (e) {
            response.status(500).json(`Error while creating book ${e.message}`);
        }
    });

    app.post("/borrow/book", userMiddleware.userAuth(), bodyParser.json(), async (request, response) => {
        try {
            if (request.body.bookId) {
                let user = await UserController.getUser(request.user);
                let book = await BookController.getBook(request.body.bookId);
                let result = await UserController.borrowBook(user,book);
                if(result){
                    return response.status(200).json(`You borrowed the book ${book.title} from ${book.authorName}`)
                }
                return response.status(400).json(`you've reached you book limit !`)
            }
            return response.status(401).json('please specify a book')
        } catch (e) {
            response.status(500).json(`Error while borrowing book ${e.message}`);
        }
    });
}
