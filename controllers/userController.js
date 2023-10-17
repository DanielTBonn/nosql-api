const User = require('../models/User');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err)
            console.log("Error occured");
            console.log(err);
        }
    },
    // Get one user
    async getSingleUser(req, res) {
        try {
            const users = await User.find({ _id: req.params.userId })
            .select('-__v');

            if(!user) {
                return res.stats(404).json({message: 'No user with that ID'})
            }

            res.json(users);
        } catch (err) {
            res.status(500).json(err)
            console.log("Error occured");
            console.log(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const users = await User.create(req.body);
            res.json(users);
        } catch (err) {
            res.status(500).json(err)
            console.log("Error occured");
            console.log(err);
        }
    },    
    // delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if(!user) {
                return res.stats(404).json({message: 'No user with that ID'})
            }

            res.json({message: "User and associated thoughts have been deleted!"});
        } catch (err) {
            res.status(500).json(err)
            console.log("Error occured");
            console.log(err);
        }
    },


};