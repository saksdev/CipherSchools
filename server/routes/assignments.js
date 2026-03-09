const express = require('express');
const router = express.Router();
const Assignment = require('../models/Assignment');
const UserProgress = require('../models/UserProgress');
const { executeQuery } = require('../controllers/queryController');
const { getHint } = require('../utils/hintService');

// Get all assignments
router.get('/', async (req, res) => {
    try {
        const assignments = await Assignment.find().select('title description question');
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get single assignment with sample data
router.get('/:id', async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);
        if (!assignment) return res.status(404).json({ error: 'Assignment not found' });
        res.json(assignment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Execute query
router.post('/execute', executeQuery);

// Get AI hint
router.post('/hint', getHint);

// Save progress (Optional)
router.post('/progress', async (req, res) => {
    const { userId, assignmentId, sqlQuery, isCompleted } = req.body;
    try {
        let progress = await UserProgress.findOne({ userId, assignmentId });
        if (progress) {
            progress.sqlQuery = sqlQuery;
            progress.isCompleted = isCompleted;
            progress.lastAttempt = Date.now();
            progress.attemptCount += 1;
        } else {
            progress = new UserProgress({ userId, assignmentId, sqlQuery, isCompleted, attemptCount: 1 });
        }
        await progress.save();
        res.json(progress);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
