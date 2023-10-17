const router = require('express').Router();
const { } = require('../../controllers/userController');

// get all users or post a new one
router
    .route('/')
    .get()
    .post();

// get, update, or delete a user by its id
router
    .route('/:userId')
    .get()
    .put()
    .delete();

// `BONUS: Remove a user's associated thoughts when deleted.`

// post new friend or delete a friend from a user's friend list
router
    .route('/:userid/friends/:friendId')
    .put()
    .delete();

module.exports = router;