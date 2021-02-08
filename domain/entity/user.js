const DefaultEntity = require('./defaultEntity');

class User extends DefaultEntity {
    static LibrarianRole = 'Librarian';
    static UserRole = 'USER';

    constructor(login, {role = 'User'} = {}, borrowedBooks) {
        super()
        this.login = login;
        this.role = role;
        this.borrowedBooks = borrowedBooks;
    }

    canBorrowBook() {
        return this.borrowedBooks.length < 4 && this.role === User.UserRole;
    }

    canReferenceBooks() {
        return this.role === User.LibrarianRole;
    }
}

module.exports = User;
