const BookController = require("../controller").BookController;

module.exports = function (app) {
    app.get('/books', (req, res) => {
        try {
            let books = BookController.getBooks();
            res.status(200).json(books);
        } catch (e) {
            res.status(400).json('Error while retrieving books');
        }
    });
}
