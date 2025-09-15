const User = require('../models/User');
const { verifyToken, extractToken } = require('../utils/jwt');

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);
    
    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Token manquant'
      });
    }
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Utilisateur manquant'
      });
    }
    req.user = user;
    next();
    
  } catch (error) {
    
    return res.status(401).json({
      status: 'error',
      message: error.message || 'Token invalide'
    });
  }
};

module.exports = {
  authenticate,
};