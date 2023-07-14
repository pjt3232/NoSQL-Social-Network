const mongoose = require('mongoose');

//creates a new mongoose schema
const ReactionSchema = new mongoose.Schema(
    {
        reactionId: {
            //defaults to a new mongoose objectId
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
    },
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

module.exports = ReactionSchema;