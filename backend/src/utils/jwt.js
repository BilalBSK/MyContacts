const jwt = require('jsonwebtoken');

/**
 * @param {Object} payload 
 * @returns {String} 
 */
const generateToken = (payload) => {
  try {
    const secret = process.env.JWT_SECRET || 'test_secret'; // fallback pour tests
    const token = jwt.sign(
      payload,
      secret,
      { 
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
        issuer: 'mycontacts-api'
      }
    );
    return token;
  } catch (error) {
    throw new Error('Erreur de token');
  }
};


/**
 * @param {String} token 
 * @returns {Object} 
 */
const verifyToken = (token) => {
  try {
    const secret = process.env.JWT_SECRET || 'test_secret';
    return jwt.verify(token, secret);
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new Error('Token expiré');
    } else if (error.name === 'JsonWebTokenError') {
      throw new Error('Token invalide');
    } else {
      throw new Error('Erreur de vérification du token');
    }
  }
};

/**
 * @param {String} authHeader 
 * @returns {String|null}
 */
const extractToken = (authHeader) => {
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7); 
  }
  return null;
};

module.exports = {
  generateToken,
  verifyToken,
  extractToken
};