const router = require('express').Router();
const User = require('../../models/User');
const Thought = require('../../models/Thought');

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

router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

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
