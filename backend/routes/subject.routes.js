// routes/subjectRoutes.js

const express = require('express');
const router = express.Router();
const Subject = require('../models/subject');

// Route for creating a new subject record
router.post('/', async (req, res) => {
  try {
    const { name, streamId } = req.body;
    const subject = new Subject({ name, streamId });
    const newSubject = await subject.save();
    res.status(201).json(newSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route for retrieving all subject records
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route for retrieving a single subject record by ID
router.get('/:id', getSubject, (req, res) => {
  res.json(res.subject);
});

// Route for updating a subject record
router.patch('/:id', getSubject, async (req, res) => {
  if (req.body.name != null) {
    res.subject.name = req.body.name;
  }
  if (req.body.streamId != null) {
    res.subject.streamId = req.body.streamId;
  }
  try {
    const updatedSubject = await res.subject.save();
    res.json(updatedSubject);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route for deleting a subject record
router.delete('/:id', getSubject, async (req, res) => {
  try {
    await res.subject.remove();
    res.json({ message: 'Subject deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single subject record by ID
async function getSubject(req, res, next) {
  let subject;
  try {
    subject = await Subject.findById(req.params.id);
    if (subject == null) {
      return res.status(404).json({ message: 'Cannot find subject' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.subject = subject;
  next();
}

module.exports = router;
