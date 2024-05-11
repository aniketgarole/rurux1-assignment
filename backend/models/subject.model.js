// models/subject.model.js

const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  streamId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Subject', subjectSchema);
