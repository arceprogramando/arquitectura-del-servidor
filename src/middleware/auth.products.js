export const isUser = (req, res, next) => {
  if (req.user && req.user.role === 'USER') {
    return next();
  }
  return res.redirect('/');
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'ADMIN') {
    return next();
  }
  return res.redirect('/');
};
