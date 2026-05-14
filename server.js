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

// Підключення до БД
mongoose.connect(process.env.MONGO_URI, {
  family: 4 
})
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ DB Error:', err));

// --- AUTH ROUTES ---

// Реєстрація
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

// Логін + Генерація JWT
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '24h' }
    );
    res.json({ token, user: { name: user.name, email: user.email, role: user.role, avatar: user.avatar } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// --- PLANE ROUTES ---

// Отримати всі літаки
app.get('/api/planes', async (req, res) => {
  try {
    const planes = await Plane.find();
    res.json(planes);
  } catch (error) {
    res.status(500).json({ error: 'Помилка отримання даних' });
  }
});
// Отримати ОДИН літак по ID
app.get('/api/planes/:id', async (req, res) => {
  try {
    const plane = await Plane.findById(req.params.id);
    if (!plane) {
      return res.status(404).json({ error: 'Літак не знайдено' });
    }
    res.json(plane);
  } catch (error) {
    res.status(500).json({ error: 'Помилка отримання літака (можливо невірний формат ID)' });
  }
});

// Додати новий літак
app.post('/api/planes', async (req, res) => {
  try {
    const newPlane = new Plane(req.body);
    await newPlane.save();
    res.status(201).json(newPlane);
  } catch (error) {
    res.status(400).json({ error: 'Помилка створення літака' });
  }
});

// Оновити літак по ID 
app.put('/api/planes/:id', async (req, res) => {
  try {
    
    const updatedPlane = await Plane.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );
    
    if (!updatedPlane) {
      return res.status(404).json({ error: 'Літак не знайдено' });
    }
    
    res.json(updatedPlane);
  } catch (err) {
    res.status(400).json({ error: 'Помилка оновлення літака' });
  }
});

// Видалити літак по ID 
app.delete('/api/planes/:id', async (req, res) => {
  try {
    const deletedPlane = await Plane.findByIdAndDelete(req.params.id);
    
    if (!deletedPlane) {
      return res.status(404).json({ error: 'Літак не знайдено' });
    }
    
    res.json({ message: 'Літак успішно видалено' });
  } catch (err) {
    res.status(500).json({ error: 'Помилка видалення літака' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));