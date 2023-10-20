const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction } = require('../../controllers/thoughtController');

// get all thoughts or post a new thought
router
    .route('/')
    .get(getThoughts)
    .post(createThought);

// get, update, or delete a single thought by id
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// update a thought's reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// delete a single reaciton from a thought
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;