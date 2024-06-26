
const express = require('express');
const router = express.Router();
const Mark = require('../models/mark.model');

router.post('/', async (req, res) => {
  try {
    const { studentId, subjectId, streamId, marksObtained } = req.body;
    const mark = new Mark({ studentId, subjectId, streamId, marksObtained });
    const newMark = await mark.save();
    res.status(201).json(newMark);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const marks = await Mark.find();
    res.json(marks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getMark, (req, res) => {
  res.json(res.mark);
});

router.patch('/:id', getMark, async (req, res) => {
  if (req.body.studentId != null) {
    res.mark.studentId = req.body.studentId;
  }
  if (req.body.subjectId != null) {
    res.mark.subjectId = req.body.subjectId;
  }
  if (req.body.streamId != null) {
    res.mark.streamId = req.body.streamId;
  }
  if (req.body.marksObtained != null) {
    res.mark.marksObtained = req.body.marksObtained;
  }
  try {
    const updatedMark = await res.mark.save();
    res.json(updatedMark);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getMark, async (req, res) => {
  try {
    await res.mark.remove();
    res.json({ message: 'Mark deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getMark(req, res, next) {
  let mark;
  try {
    mark = await Mark.findById(req.params.id);
    if (mark == null) {
      return res.status(404).json({ message: 'Cannot find mark' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.mark = mark;
  next();
}

module.exports = router;
