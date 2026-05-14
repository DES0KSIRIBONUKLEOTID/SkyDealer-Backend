const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('./models/User');
const Plane = require('./models/Plane');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  family: 4 
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const userRole = email === 'danyab554@gmail.com' ? 'ADMIN' : 'USER';
    
    const user = new User({ 
      name, 
      email, 
      password: hashedPassword, 
      role: userRole 
    });
    
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (err) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );
    res.json({ 
      token, 
      user: { 
        id: user._id,
        name: user.name, 
        email: user.email, 
        role: user.role, 
        avatar: user.avatar,
        favorites: user.favorites || [],
        isTwoFactorEnabled: user.isTwoFactorEnabled || false
      } 
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.get('/api/auth/me', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      favorites: user.favorites || [],
      isTwoFactorEnabled: user.isTwoFactorEnabled || false
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/users/profile/:id', authenticateToken, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      avatar: updatedUser.avatar,
      favorites: updatedUser.favorites || [],
      isTwoFactorEnabled: updatedUser.isTwoFactorEnabled || false
    });
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
});

app.get('/api/planes', async (req, res) => {
  try {
    const planes = await Plane.find();
    res.json(planes);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/planes/:id', async (req, res) => {
  try {
    const plane = await Plane.findById(req.params.id);
    if (!plane) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(plane);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/planes', async (req, res) => {
  try {
    const newPlane = new Plane(req.body);
    await newPlane.save();
    res.status(201).json(newPlane);
  } catch (error) {
    res.status(400).json({ error: 'Creation failed' });
  }
});

app.put('/api/planes/:id', async (req, res) => {
  try {
    const updatedPlane = await Plane.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    
    if (!updatedPlane) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    res.json(updatedPlane);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
});

app.delete('/api/planes/:id', async (req, res) => {
  try {
    const deletedPlane = await Plane.findByIdAndDelete(req.params.id);
    
    if (!deletedPlane) {
      return res.status(404).json({ error: 'Not found' });
    }
    
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));