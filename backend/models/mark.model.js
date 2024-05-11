// models/mark.model.js

const mongoose = require('mongoose');

const markSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true
  },
  subjectId: {
    type: String,
    required: true
  },
  streamId: {
    type: String,
    required: true
  },
  marksObtained: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Mark', markSchema);
