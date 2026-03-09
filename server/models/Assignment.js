const mongoose = require('mongoose');

const AssignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
  question: { type: String, required: true },
  workspaceId: { type: String, required: true }, // maps to PostgreSQL schema in Supabase
  sampleTables: [{
    tableName: String,
    columns: [{
      columnName: String,
      dataType: String
    }],
    rows: [mongoose.Schema.Types.Mixed]
  }],
  expectedOutput: {
    type: { type: String, enum: ['table', 'single_value', 'column', 'count'], required: true },
    value: mongoose.Schema.Types.Mixed
  }
}, { timestamps: true });

module.exports = mongoose.model('Assignment', AssignmentSchema);
