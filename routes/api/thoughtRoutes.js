const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

// get all thoughts or post a new thought
router
    .route('/')
    .get(getThoughts)
    // pushes the created thought's _id to the associated user's thoughts array field
    .post(createThought);

// get, update, or delete a single thought by id
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// update a thought's reactions
router
    .route('/:thoughtid/reactions')
    .put(addReaction);

// delete a single reaciton from a thought
router
    .route('/:thoughtid/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;