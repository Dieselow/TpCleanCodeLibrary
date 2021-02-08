const mongoose = require('mongoose');
const BookClass = require('../domain/entity/book');

const BookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    dateBorrowed: {
        type: Date,
        required: false,
        default: null
    }

}, {timestamps: true});

BookSchema.index({title: 1})
BookSchema.index({authorName: 1})
BookSchema.index({dateBorrowed: 1})

BookSchema.loadClass(BookClass);

module.exports = mongoose.model('Book', BookSchema);
