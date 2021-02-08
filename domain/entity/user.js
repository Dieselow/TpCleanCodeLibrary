const DefaultEntity = require('./defaultEntity');

class User extends DefaultEntity {
    static LibrarianRole = 'LIBRARIAN';
    static UserRole = 'USER';

    constructor(login, role = User.UserRole, borrowedBooks) {
        super()
        this.login = login;
        this.role = role;
        this.borrowedBooks = borrowedBooks;
    }

    canBorrowBook() {
        if (this.borrowedBooks === null) {
            return true;
        }
        return this.borrowedBooks.length < 4 && this.role === User.UserRole;
    }

    canReferenceBooks() {
        return this.role === User.LibrarianRole;
    }
}

module.exports = User;
