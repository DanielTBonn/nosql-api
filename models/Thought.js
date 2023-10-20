const mongoose = require('mongoose');
const Reaction = require('./Reaction');
const { reformatDate } = require('../utils/helpers');

// schema for the user's thoughts
const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: reformatDate,

        },
        username: {
            type: String,
            required: true,
        },
        reactions: [Reaction],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }
);

// added a virtual counting the number of reactions a thought has 
thoughtSchema.virtual('reactionCount')
    .get(function() {
    return `${this.reactions.length}`;
    })
    .set(function(count) {
        this.set({ count })
});

// create the thought collection model for our db
const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;