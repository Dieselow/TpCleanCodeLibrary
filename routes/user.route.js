const UserController = require("../controller").UserController;
const User = require("../domain/entity/user");
const bodyParser = require("body-parser");
module.exports = function (app) {
    app.post('/user', bodyParser.json(), async (request, response) => {
        try {
            if (request.body.login) {
                let user = await UserController.createUser(new User(request.body.login, request.body.role, null));
                return response.status(201).json(user)
            }
            return response.status(401).json('bad params');

        } catch (e) {
            return response.status(500).json(`Error while creating user ${e.message}`);
        }
    });
}
