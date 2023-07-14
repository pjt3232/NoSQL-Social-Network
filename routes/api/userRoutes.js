const router = require('express').Router();
const User = require('../../models/User');
const Thought = require('../../models/Thought');

//route for finding all users and populates the user json data
router.get('/', async (req, res) => {
    try {
        const user = await User.find().populate('thoughts friends');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//route for finding a single user by Id and populating that user's json data
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('thoughts friends');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//route for creating a new user using the req.body
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//route for updating a user by Id params
//uses req.body to update the param User
router.put('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//route for deleting a user by finding by Id and deleting all data under that user
router.delete('/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndRemove(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        await Thought.deleteMany({ _id: {
            $in: deletedUser.thoughts
        }});
        res.json(deletedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//route for adding a friend to a user account
//finds by Id and updates the user by adding to the array of friends with the param Id
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { friends: friendId }
            },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//route for deleting a friend from a user account
//finds by Id and updates the user by pulling from the friend's param Id from the user Id
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const { userId, friendId } = req.params;
        const user = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { friends: friendId }
            },
            { new: true }
        );
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
