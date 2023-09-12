export const isUser = (req, res, next) => {
  try {
    if (req.user && (req.user.role === 'USER' || req.user.role === 'ADMIN')) {
      return next();
    }
    return res.status(403).redirect('/');
  } catch (error) {
    return res.status(500).send('Error interno del servidor');
  }
};

export const isAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role === 'ADMIN') {
      return next();
    }
    return res.status(403).redirect('/');
  } catch (error) {
    return res.status(500).send('Error interno del servidor');
  }
};

export const isAuthenticated = (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.status(401).redirect('/');

  } catch (error) {
    return res.status(500).send('Error interno del servidor');
  }
};
