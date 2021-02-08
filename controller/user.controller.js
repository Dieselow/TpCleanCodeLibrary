const UserSchema = require('../models').Users;
const Repository = require('../infra/database/mongooseRepository');
class UserController {

    constructor() {
        this.userRepository = new Repository(UserSchema)
    }

    /**
     *
     * @param {UserSchema} user
     */
    createUser(user) {
        return this.userRepository.create(user);
    }
}
