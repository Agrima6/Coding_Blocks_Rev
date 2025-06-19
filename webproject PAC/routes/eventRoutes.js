// Updated Event Routes (eventRoutes.js)

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Event = require('../models/Event');

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Ensure unique filenames
  }
});

const upload = multer({ storage });

// Create Event (POST)
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

  try {
    const newEvent = new Event({ title, description, image: imageUrl });
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating event', error });
  }
});

// Get All Events (GET)
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching events', error });
  }
});

// Delete Event (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id); // Find the event by its ID
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete the associated image file if it exists
    if (event.image) {
      const filePath = path.join(__dirname, '..', event.image); // Construct the file path
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // Delete the image file
      }
    }

    // Delete the event document from the database
    await event.deleteOne();
    res.status(200).json({ message: 'Event and image deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting event', error });
  }
});

// Update Event (PUT)
router.put('/:id', upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined;

  try {
    const updatedData = { title, description };
    if (image) updatedData.image = image;

    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (updatedEvent) {
      res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event', error });
  }
});

module.exports = router;
