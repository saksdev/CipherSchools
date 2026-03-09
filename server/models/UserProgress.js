const mongoose = require('mongoose');

const UserProgressSchema = new mongoose.Schema({
    userId: { type: String, required: true }, // sessionId or userId
    assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Assignment', required: true },
    sqlQuery: { type: String, default: '' },
    lastAttempt: { type: Date, default: Date.now },
    isCompleted: { type: Boolean, default: false },
    attemptCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('UserProgress', UserProgressSchema);
