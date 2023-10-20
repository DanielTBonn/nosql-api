const User = require('../models/User');
const Thought = require('../models/Thought');

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
            const user = await User.find({ _id: req.params.userId })
            .select('-__v');

            if(!user) {
                return res.status(404).json({message: 'No user with that ID'})
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err)
            console.log("Error occured");
            console.log(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err)
            console.log("Error occured");
            console.log(err);
        }
    },    
    // update a user
    async updateUser (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true },
                );

                if(!user) {
                    return res.status(404).json({message: 'No user with that ID'})
                }

                res.json(user);
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

            console.log(user)

            if (user.thoughts.length) {
                for (let i = 0; i < user.thoughts.length; i++) {
                    await Thought.findOneAndDelete({ _id: user.thoughts[i]})
                    console.log(`Successfully deleted thought with id ${user.thoughts[i]}`)
                }
            }

            if(!user) {
                return res.status(404).json({message: 'No user with that ID'})
            }

            res.json({message: "User and associated thoughts have been deleted!"});
        } catch (err) {
            res.status(500).json(err)
            console.log("Error occured");
            console.log(err);
        }
    },
    // update a user's friends
    async addFriend (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $addToSet: { friends: {_id: req.params.friendId}}},
                { runValidators: true, new: true },
                );

                if(!user) {
                    return res.status(404).json({message: 'No user with that ID'})
                }

                res.json(user);
            } catch (err) {
                res.status(500).json(err)
                console.log("Error occured");
                console.log(err);
            }
    },
    // delete a friend from a user
    async deleteFriend (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId }},
                { runValidators: true, new: true },
                );

                if(!user) {
                    return res.status(404).json({message: 'No user with that ID'})
                }

                res.json(user);
            } catch (err) {
                res.status(500).json(err)
                console.log("Error occured");
                console.log(err);
            }
    },
};