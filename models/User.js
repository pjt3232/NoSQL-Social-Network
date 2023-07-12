const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: { 
            type: String,
            unique: true,
            required: true,
            trim: true,
            },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
        },
        thoughts: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Thought'
        }],
        friends: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User'
        }],
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

const User = mongoose.model('User', userSchema);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = User;