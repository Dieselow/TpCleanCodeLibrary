const mongoose = require("mongoose");

const UserClass = require('../domain/entity/user');

const UserSchema = mongoose.Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    role: {
        type: String,
        default: UserClass.UserRole
    },
    borrowedBooks: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Book"
    }],
    required: false
}, {timestamps: true});

UserSchema.index({login: 1});
UserSchema.index({role: 1});
UserSchema.index({borrowedBooks: 1});

UserSchema.loadClass(UserClass);

module.exports = mongoose.model('User', UserSchema);
