const mongoose = require('mongoose');


const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: new ObjectId(),
        },
        reactionText: {
        type: String,
        required: true,
        
        },
        username: {
        type: String,
        required: true,
        },
        createdAt: {
        type: Date,
        default: Date.now,
    
        },
    },

);

const thoughtSchema = new mongoose.Schema(
    {
        thoughtText: {
            type: String,
            required: true,

        },
        createdAt: {
            type: Date,
            default: Date.now,

        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema],

    },
    {
        toJson: {
            virtuals: true
        },
        id: false
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('thought', thoughtSchema);

const handleError = (err) => console.log(err);

module.exports = Thought;