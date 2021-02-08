import mongoose from "mongoose";

import UserClass from '../domain/entity/user';

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
        type: Schema.Types.ObjectId, ref: "Book"
    }],
    required: false
}, {timestamps: true});

UserSchema.index({login: 1});
UserSchema.index({role: 1});
UserSchema.index({borrowedBooks: 1});

UserSchema.loadClass(UserClass);

export default mongoose.model('User', UserSchema);
