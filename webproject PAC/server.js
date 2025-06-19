const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const eventRoutes = require('./routes/eventRoutes'); // Ensure this path matches your directory structure

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded images
app.use('/api/events', eventRoutes); // Mount event routes

// Database Connection (Replace with your MongoDB connection string)

const DB_URI = 'mongodb+srv://agrimaagarwal23cse:XgxgVCIPeF65U7EI@paccluster.jn33f.mongodb.net/'; // Update with actual URI if necessary
mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error:', err));

// Event Model (Check if model already exists)
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String, // Image path will be stored here
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema); // Check if model exists before defining

// Set up multer for file uploading
const upload = multer({ dest: 'uploads/' }); // Store uploaded images in the 'uploads' folder

// Routes for creating and fetching events
app.post('/api/events', upload.single('image'), (req, res) => {
  const { title, description } = req.body;
  const imagePath = `/uploads/${req.file.filename}`; // Correct// Save the relative image path
  const newEvent = new Event({
    title,
    description,
    image: imagePath, // Store the relative path of the image
  });

  newEvent.save()
    .then(event => res.json({ message: 'Event created successfully!', event }))
    .catch(err => res.status(400).json({ message: 'Error creating event', error: err }));
});

app.get('/api/events', (req, res) => {
  Event.find()
    .then(events => res.json(events))
    .catch(err => res.status(400).json({ message: 'Error fetching events', error: err }));
});

app.delete('/api/events/:id', (req, res) => {
  Event.findByIdAndDelete(req.params.id)
    .then(() => res.json({ message: 'Event deleted successfully' }))
    .catch(err => res.status(400).json({ message: 'Error deleting event', error: err }));
});

app.put('/api/events/:id', upload.single('image'), (req, res) => {
  const { title, description } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image;
  Event.findByIdAndUpdate(req.params.id, { title, description, image: imagePath }, { new: true })
    .then(updatedEvent => res.json({ message: 'Event updated successfully', event: updatedEvent }))
    .catch(err => res.status(400).json({ message: 'Error updating event', error: err }));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
