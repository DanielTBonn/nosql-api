const Thought = require('../models/Thought');

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
            return res.stats(404).json({message: 'No thought with that ID'})
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
                return res.stats(404).json({message: 'No thought with that ID'})
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
            return res.stats(404).json({message: 'No thought with that ID'})
        }

        res.json({message: "User and associated thoughts have been deleted!"});
    } catch (err) {
        res.status(500).json(err)
        console.log("Error occured");
        console.log(err);
    }
},
};