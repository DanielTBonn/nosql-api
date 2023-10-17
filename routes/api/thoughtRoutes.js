const router = require('express').Router();
const { } = require('../../controllers/thoughtController');

// get all thoughts or post a new thought
router
    .route('/')
    .get()
    // pushes the created thought's _id to the associated user's thoughts array field
    .post()

router
    .route('/:thoughtId')
    .get()
    .put()
    .delete();

router
    .route('/:thoughtid/reactions')
    .put()
    .delete();

module.exports = router;