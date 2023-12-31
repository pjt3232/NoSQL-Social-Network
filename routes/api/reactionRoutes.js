const router = require('express').Router();
const Thought = require('../../models/Thought');

//route for posting a thought reaction
//finds by Id and updates the thought by pushing up new reaction json data
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const { thoughtId } = req.params;
        const { reactionBody, username } = req.body;
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            {
                $push: { reactions: {
                    reactionBody,
                    username
                }}
            },
            { new: true }
        );
        res.json(updatedThought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//route for deleting a thought reaction
//finds by Id and updates the thought by pulling the reaction json data
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const { thoughtId, reactionId } = req.params;
        const updatedThought = await Thought.findByIdAndUpdate(
            thoughtId,
            {
                $pull: { 
                    reactions: { reactionId: reactionId} 
                }
            },
            { new: true }
        );
        res.json(updatedThought);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;