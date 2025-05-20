const express = require('express');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const profileRoutes = require('./routes/profile');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const projectsRouter = require('./routes/projects');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors({
  origin: ['https://joash-portfolio.onrender.com', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/bio', require('./routes/bio'));
app.use('/api/about', require('./routes/about'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/admin', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/admin/projects', projectsRouter);

// Error Handler

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});