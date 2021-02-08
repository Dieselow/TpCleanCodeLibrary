const Repository = require('../infra/database/mongooseRepository');
const UserSchema = require('../models/index').Users;
const UserClass = require('../domain/entity/user');

class UserMiddleware {

    constructor() {
        this.userRepository = new Repository(UserSchema);
    }

    static librarianAuth() {
        return async function (request, response, next) {
            const login = request.headers['login'];
            if (!login) {
                response.status(401).end();
                return;
            }
            const user = await this.userRepository.find({login: login});
            if (!user || user.role !== UserClass.LibrarianRole) {
                response.status(403).end()
                return;
            }

            request.user = user;
            next();

        }
    }

    static userAuth() {
        return async function (request, response, next) {
            const login = request.headers['login'];
            if (!login) {
                response.status(401).end();
                return;
            }
            const user = await this.userRepository.find({login: login});
            if (!user || user.role !== UserClass.UserRole) {
                response.status(403).end()
                return;
            }

            request.user = user;
            next();
        }
    }
}

module.exports = UserMiddleware;
