// routes/student.routes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Student = require('../models/student.model');

// Route for student signup
router.post('/signup', async (req, res) => {
  const { username, password, year, field } = req.body;

  try {
    // Check if student already exists
    let student = await Student.findOne({ username });
    if (student) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new student
    student = new Student({
      username,
      password: hashedPassword,
      year,
      field
    });

    // Save student to database
    await student.save();

    res.status(201).json({ message: 'Student created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route for student login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if student exists
    const student = await Student.findOne({ username });
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, student.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Return success message
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to retrieve profile information of the logged-in student
router.get('/profile', async (req, res) => {
  try {
    // Get student ID from request (you'll need to implement this based on authentication)
    const studentId = req.user.id;

    // Retrieve student profile from database
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

// routes/student.routes.js

// Existing code...

// Route to retrieve performance data of the logged-in student
router.get('/performance', async (req, res) => {
    try {
      // Get student ID from request (you'll need to implement this based on authentication)
      const studentId = req.user.id;
  
      // Query subjects and their marks for the student from the database
      // For example:
      const subjectsAndMarks = await Mark.find({ studentId }).populate('subjectId');
      
      // Extract subject names and marks from the query result
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
  