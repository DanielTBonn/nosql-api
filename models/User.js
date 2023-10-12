const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        unique: true,
        required: true, 
    },
    email: { 
        type: String, 
        required: true 
    },
    thoughts: Array,
    friends: Array,
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