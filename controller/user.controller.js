const UserSchema = require('../models').Users;
const Repository = require('../infra/database/mongooseRepository');

class UserController {

    constructor() {
        this.userRepository = new Repository(UserSchema)
    }

    /**
     *
     * @param {User} user
     */
    async createUser(user) {
        return await this.userRepository.create(user);
    }

    async borrowBook(user, book) {
        if (user.canBorrowBook()) {
            user.borrowedBooks.push(book);
            await this.userRepository.update(user._id, user);
            return true;
        }
        return false;
    }
}
module.exports = new UserController();
