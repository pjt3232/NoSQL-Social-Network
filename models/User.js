const mongoose = require('mongoose');

//creates a new mongoose schema for the User model
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
            //regex used for matching and validating an email address
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

//creates mongoose model using the userSchema
const User = mongoose.model('User', userSchema);

//virtual method that returns how many friends each user has
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

module.exports = User;