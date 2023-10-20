const mongoose = require('mongoose');

// schema for storing the user documents of our database
const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true, 
        unique: true,
        trim: true,
    },
    email: { 
        type: String, 
        required: true,
        unique: true,
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
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false
  }
);

// created a virtual to count the number of friends a user has
userSchema.virtual('friendCount')
  .get(function() {
    return `${this.friends.length}`;
  })
  .set(function(count) {
    this.set({ count })
});

// create the user collection model for our db
const User = mongoose.model('user', userSchema);

module.exports = User;