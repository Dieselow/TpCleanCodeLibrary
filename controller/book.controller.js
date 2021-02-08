const BookSchema = require("../models/books");
const BookModel = require("../domain/entity/book");

const Repository = require('../infra/database/mongooseRepository');

class BookController {
    constructor() {
        this.bookRepository = new Repository(BookSchema);
    }

    async getBooks() {
        return await this.bookRepository.find();
    }

    /**
     *
     * @param {BookModel} bookModel
     * @return {Promise<void>}
     */
    async createBook(bookModel) {
        return await this.bookRepository.create(bookModel);
    }

}

module.exports = new BookController();
