const User = require('../models/User');
const { generateToken } = require('../utils/jwt');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'mail et mdp obligatoire'
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'Le mdp doit faire minimum 6 caractères'
      });
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Ce compte existe deja'
      });
    }
    
    const user = new User({
      email,
      password
    });
    
    await user.save();

    const token = generateToken({ userId: user._id });
    
    res.status(201).json({
      status: 'success',
      message: 'Compte créé avec succès',
      data: {
        user: {
          id: user._id,
          email: user.email,
          createdAt: user.createdAt
        },
        token
      }
    });
    
  } catch (error) {
    console.error('Erreur inscription:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        status: 'error',
        message: 'Ce compte existe deja'
      });
    }
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'mail et mdp obligatoire'
      });
    }
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'mail ou mdp incorrect'
      });
    }
    
    const isPasswordValid = await user.comparePassword(password);
    
    if (!isPasswordValid) {
      return res.status(401).json({
        status: 'error',
        message: 'mail ou mdp incorrect'
      });
    }
    const token = generateToken({ userId: user._id });

    return res.json({
      status: 'success',
      message: 'Connexion réussie',
      data: {
        user: {
          id: user._id,
          email: user.email,
          createdAt: user.createdAt
        },
        token
      }
    });
    
  } catch (error) {
    console.error('Erreur connexion:', error);
    
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la connexion'
    });
  }
};

const getInfos = async (req, res) => {
  try {
    const user = req.user;
    
    res.json({
      status: 'success',
      data: {
        user: {
          id: user._id,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });
    
  } catch (error) {
    console.error('Erreur getInfos:', error);
    
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des infos utilisateur'
    });
  }
};

module.exports = {
  register,
  login,
  getInfos
};