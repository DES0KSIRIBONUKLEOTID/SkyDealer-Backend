const mongoose = require('mongoose');

const planeSchema = new mongoose.Schema({
  title: String,
  price: Number,
  images: [String], 
  category: String, 
  description: String,
  status: { type: String, default: 'В наявності' }, 
  year: Number,
  manufacturer: String,
  specs: {
    range: String,
    speed: String,
    passengers: Number,
    altitude: String, 
    engines: String,  
    cargo: String     
  }
});

module.exports = mongoose.model('Plane', planeSchema);