
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Student = require('../models/student.model');

router.post('/signup', async (req, res) => {
  const { username, password, year, field } = req.body;

  try {
    let student = await Student.findOne({ username });
    if (student) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    student = new Student({
      username,
      password: hashedPassword,
      year,
      field
    });

    await student.save();

    res.status(201).json({ message: 'Student created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const student = await Student.findOne({ username });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordMatch = await bcrypt.compare(password, student.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await Student.findById(studentId).select('-password');
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/performance', async (req, res) => {
    try {
      const studentId = req.user.id;
  
      const subjectsAndMarks = await Mark.find({ studentId }).populate('subjectId');
      
      const performanceData = subjectsAndMarks.map(item => ({
        subject: item.subjectId.name,
        marks: item.marksObtained
      }));
  
      res.json(performanceData);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  module.exports = router;
  