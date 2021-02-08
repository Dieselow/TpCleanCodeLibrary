import DefaultEntity from './defaultEntity';

class Book extends DefaultEntity {
    constructor(title, authorName) {
        super();
        this.title = title;
        this.authorName = authorName;
    }
}
