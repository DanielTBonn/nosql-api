const mongoose = require('mongoose');



const thoughtSchema = new mongoose.Schema({
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
  reactions: [reactionSchema]

});

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        unique: true,
        required: true, 
    },
    email: { 
        type: String, 
        required: true,
        validate: {
          validator: function (value) {
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value);
          },
          message: 'Invalid Email Address',
        },
    },
    thoughts: [thoughtSchema],
    friends: [userSchema],
    lastAccessed: { type: Date, default: Date.now },
  });

const User = mongoose.model('User', userSchema);

const handleError = (err) => console.log(err);

User
  .create({
    username: "Daniel Bonn",
    email: "danieltbonn@gmail.com",
    thoughts: [],
    friends: [],
  })
  .then(result => console.log('Created a new document', result))
  .catch(err => handleError(err));


module.exports = User;