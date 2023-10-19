const router = require('express').Router();
const { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend } = require('../../controllers/userController');

// get all users or post a new one
router
    .route('/')
    .get(getUsers)
    .post(createUser);

// get, update, or delete a user by its id
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// `BONUS: Remove a user's associated thoughts when deleted.`

// post new friend or delete a friend from a user's friend list
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

module.exports = router;