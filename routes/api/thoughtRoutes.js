const router = require('express').Router();
const User = require('../../models/User');
const Thought = require('../../models/Thought');

router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find().populate('reactions');
        res.json(thoughts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.get('/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ error: 'Thought not found' });
        }
        res.json(thought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { username, userId, thoughtText } = req.body;
        const thought = await Thought.create({
            thoughtText,
            username
        });
        await User.findByIdAndUpdate(
            userId,
            {
                $push: { thoughts: thought._id}
            },
            { new: true }
        );
        res.json(thought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.put('/:thoughtId', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true }
        );
        if (!updatedThought) {
            return res.status(404).json({ error: 'Thought not found' });
        }
        res.json(updatedThought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.delete('/:thoughtId', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndRemove(req.params.thoughtId);
        if (!deletedThought) {
            return res.status(404).json({ error: 'Thought not found' });
        }
        await User.updateMany({}, {
            $pull: { 
                thoughts: req.params.thoughtId
            }
        });
        res.json(deletedThought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;