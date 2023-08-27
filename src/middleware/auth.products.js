const isLogged = (req, res, next) => {
  if (req.user && req.user.role === 'USER') {
    return next();
  }
  return res.redirect('/');
};

export default isLogged;
