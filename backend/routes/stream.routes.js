
const express = require('express');
const router = express.Router();
const Stream = require('../models/stream.model');

router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const stream = new Stream({ name });
    const newStream = await stream.save();
    res.status(201).json(newStream);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const streams = await Stream.find();
    res.json(streams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getStream, (req, res) => {
  res.json(res.stream);
});

router.patch('/:id', getStream, async (req, res) => {
  if (req.body.name != null) {
    res.stream.name = req.body.name;
  }
  try {
    const updatedStream = await res.stream.save();
    res.json(updatedStream);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', getStream, async (req, res) => {
  try {
    await res.stream.remove();
    res.json({ message: 'Stream deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getStream(req, res, next) {
  let stream;
  try {
    stream = await Stream.findById(req.params.id);
    if (stream == null) {
      return res.status(404).json({ message: 'Cannot find stream' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.stream = stream;
  next();
}

module.exports = router;
