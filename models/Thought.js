const mongoose = require('mongoose');
const ReactionSchema = require('./Reaction');

//creates new mongoose schema for the Thought model
const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true
        },
        reactions: [ReactionSchema],
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

//creates Thought model using thoughtSchema
const Thought = mongoose.model('Thought', thoughtSchema);

//virtual method that lists the total amount of reactions for each thought
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = Thought;