const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought } = require('../../controllers/thoughtController');

// get all thoughts or post a new thought
router
    .route('/')
    .get(getThoughts)
    // pushes the created thought's _id to the associated user's thoughts array field
    .post(createThought)

router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

router
    .route('/:thoughtid/reactions')
    .put()
    .delete();

module.exports = router;