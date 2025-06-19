const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { title, description } = req.body;
    const image = req.file ? req.file.path : '';

    const newEvent = new Event({ title, description, image });
    await newEvent.save();

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
