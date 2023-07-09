const mongoose = require('mongoose');
const ReactionSchema = require('./Reaction');

const Thought = mongoose.model('Thought', new mongoose.Schema({
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
    toJSON: {
        virtuals: true
    }
}));

Thought.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

module.exports = Thought;