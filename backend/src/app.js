const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Helmet pour secure les header http
app.use(helmet());

const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', 
  credentials: true, 
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
};
app.use(cors(corsOptions));

// Parsing du JSON et des formulaires
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: true })); 

// logs developpement 
if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`📝 ${req.method} ${req.path} - ${timestamp}`);
    next(); 
  });
}

// Route auth (register, login)
app.use('/api/auth', authRoutes);

// Route contacts (CRUD)
app.use('/api/contacts', contactRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route ${req.originalUrl} non trouvée`,
    availableRoutes: [
      'POST /api/auth/register',
      'POST /api/auth/login', 
      'GET /api/contacts',
      'POST /api/contacts'
    ]
  });
});

  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      status: 'error',
      message: 'Données non valides',
      errors: errors
    });
  }
  
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
    });
  };

module.exports = app;