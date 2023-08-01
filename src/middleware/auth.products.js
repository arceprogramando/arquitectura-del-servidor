const isLogged = (req, res, next) => {
  if (req.session?.user && req.session?.user.role === 'USER') {
    return next();
  }
  return res.redirect('/');
};

export default isLogged;
