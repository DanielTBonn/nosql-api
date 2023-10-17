const mongoose = require('mongoose');

// schema for the reactions to thoughts
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
            get: reformatDate,
        },
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false
    }

);

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
        reactions: [reactionSchema],

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

// added a getter method to display the date a cleaner format
function reformatDate(date) {
    const formatDate = new Date(date)
    return formatDate.toLocaleDateString()
}

// create the thought collection model for our db
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

const newThought = new Thought({
    thoughtText: `Daniel`,
    username: `Bonn`,
    });

module.exports = Thought;