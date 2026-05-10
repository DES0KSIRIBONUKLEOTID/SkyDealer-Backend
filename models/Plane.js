const mongoose = require('mongoose');

const planeSchema = new mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  category: String, 
  description: String,
  specs: {
    range: String,
    speed: String,
    passengers: Number
  }
});

module.exports = mongoose.model('Plane', planeSchema);