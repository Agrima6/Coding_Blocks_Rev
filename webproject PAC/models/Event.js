const mongoose = require('mongoose');

// Check if the model is already defined
const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

module.exports = Event;
