const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
// Get all thoughts
async getThoughts(req, res) {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err)
        console.log("Error occured");
        console.log(err);
    }
},
// Get one thought
async getSingleThought(req, res) {
    try {
        const thought = await Thought.find({ _id: req.params.thoughtId })
        .select('-__v');

        if(!thought) {
            return res.status(404).json({message: 'No thought with that ID'})
        }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err)
        console.log("Error occured");
        console.log(err);
    }
},
// create a new thought
async createThought(req, res) {
    try {
        const thought = await Thought.create(req.body);
        const user = await User.findOneAndUpdate(
            { username: req.body.username},
            { $addToSet: { thoughts: thought._id} },
            { new: true }
            );

        if (!user) {
            return res.status(404).json({
              message: 'Thought created, but found no user with that name',
            })
          }

        res.json(thought);
    } catch (err) {
        res.status(500).json(err)
        console.log("Error occured");
        console.log(err);
    }
},    

// update a thought
async updateThought (req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true },
            );


            if(!thought) {
                return res.status(404).json({message: 'No thought with that ID'})
            }


            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
            console.log("Error occured");
            console.log(err);
        }
},
// delete a thought
async deleteThought(req, res) {
    try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

        if(!thought) {
            return res.status(404).json({message: 'No thought with that ID'})
        }

        await User.findOneAndUpdate(
            { username: thought.username},
            { $pull: { thoughts: thought._id} },
            { runValidators: true, new: true }
            );

        res.json({message: "Thought has been deleted and associated user updated!"});
    } catch (err) {
        res.status(500).json(err)
        console.log("Error occured");
        console.log(err);
    }
},
// add reaction to thought
async addReaction(req, res) {
    try {

        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true }
        );

        if(!thought) {
            return res.status(404).json({message: 'No thought with that ID'})
        };

        res.json(thought);
    } catch (err) {
        res.status(500).json(err)
        console.log("Error occured");
        console.log(err);
    }
},
// delete reaction from thought
async deleteReaction(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId}} },
            { runValidators: true, new: true }
        );
        
        console.log(thought)
        console.log(req.params.reactionId)
        if(!thought) {
            return res.status(404).json({message: 'No thought with that ID'})
        };

        res.json(thought);
    } catch (err) {
        res.status(500).json(err)
        console.log("Error occured");
        console.log(err);
    }
},
};