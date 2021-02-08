const DefaultEntity = require('./defaultEntity');

class Book extends DefaultEntity {
    constructor(title, authorName) {
        super();
        this.title = title;
        this.authorName = authorName;
    }
}

module.exports = Book;
