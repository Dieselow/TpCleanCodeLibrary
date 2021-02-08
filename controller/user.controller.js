const UserSchema = require('../models').Users;
const BookSchema = require('../models').Books;
const Repository = require('../infra/database/mongooseRepository');

class UserController {

    constructor() {
        this.userRepository = new Repository(UserSchema);
        this.bookRepository = new Repository(BookSchema);
    }

    /**
     *
     * @param {User} user
     */
    async createUser(user) {
        return await this.userRepository.create(user);
    }

    async borrowBook(user, book) {
        if (user.canBorrowBook() && book.canBeBorrowed()) {
            if (user.borrowedBooks === null) {
                user.borrowedBooks = [];
            }
            user.borrowedBooks.push(book);
            book.dateBorrowed = new Date();
            await this.userRepository.update(user._id, user);
            await this.bookRepository.update(book._id, book);
            return true;
        }
        return false;
    }

    async returnBook(user, book) {
        if(user.borrowedBooks !== null && user.borrowedBooks.length > 0){
            user.borrowedBooks.pull(book._id);
            book.dateBorrowed = null
            await this.userRepository.update(user._id, user);
            await this.bookRepository.update(book._id, book);
            return true;
        }
        return false;
    }

    /**
     *
     * @param query
     * @return {Promise<UserSchema>}
     */
    async getUser(query) {
        return await this.userRepository.find(query, {multiple: false, populate: true, paths: ['borrowedBooks']});
    }
}

module.exports = new UserController();
