module.exports = function (app) {
    require('./books.route')(app);
    require('./user.route')(app);
}
