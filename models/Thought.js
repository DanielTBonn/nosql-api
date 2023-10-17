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

// function reformatDate(date) {
//     const formatDate = new Date(date)
//     return formatDate.toLocaleDateString()
// }

// create the thought collection model for our db
const Thought = mongoose.model('thought', thoughtSchema);

const handleError = (err) => console.log(err);

// Thought
//     .create(
//         {
//             thoughtText: "Hello World!",
//             username: "Daniel T Bonn",
//             reactions: []
//         }
//     )
//     .then(result => console.log('Created a new document', result))
//     .catch(err => handleError(err));

// const newThought = new Thought({
//     thoughtText: `Daniel`,
//     username: `Bonn`,
//     });

module.exports = Thought;