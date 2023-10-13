const mongoose = require('mongoose');


const reactionSchema = new mongoose.Schema(
    {
        reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Schema.Types.ObjectId(),
        },
        reactionBody: {
        type: String,
        required: true,
        maxLength: 280,
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
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: reformatDate

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

function reformatDate(date) {
    const formatDate = new Date(date)
    return formatDate.toLocaleDateString()
}

const Thought = mongoose.model('thought', thoughtSchema);

const handleError = (err) => console.log(err);

Thought
    .create(
        {
            thoughtText: "Hello World!",
            username: "Daniel T Bonn",
            reactions: []
        }
    )
    .then(result => console.log('Created a new document', result))
    .catch(err => handleError(err));

module.exports = Thought;