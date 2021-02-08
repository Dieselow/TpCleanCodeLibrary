import DefaultEntity from './defaultEntity'

class User extends DefaultEntity {
    UserRole = 'User';
    LibrarianRole = 'Librarian';

    constructor(login, {role = 'User'} = {}, borrowedBooks) {
        super()
        this.login = login;
        this.role = role;
        this.borrowedBooks = borrowedBooks;
    }

    canBorrowBook() {
        return this.borrowedBooks.length < 4 && this.role === this.UserRole;
    }

    canReferenceBooks() {
        return this.role === this.LibrarianRole;
    }
}
