const mongoose = require('mongoose');
const { ObjectId } = require('mongodb') 
// const Thought = require('./Thought');



const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true, 
        trim: true,
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
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'thought'
      }
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ],
    lastAccessed: { type: Date, default: Date.now },
  });

const User = mongoose.model('user', userSchema);

const handleError = (err) => console.log(err);

// User
//   .create({
//     username: "lernantino",
//     email: "lernantino@gmail.com",
//     thoughts: [],
//     friends: [],
//   },
//   {
//     username: "a name",
//     email: "lernantino@gmail.com",
//     thoughts: [],
//     friends: [],
//   })
//   .then(result => console.log('Created a new document', result))
//   .catch(err => handleError(err));


module.exports = User;