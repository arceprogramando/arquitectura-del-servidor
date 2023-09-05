export const isUser = (req, res, next) => {
  if (req.user && req.user.role === 'USER') {
    return next();
  }
  return res.status(200);
};

export const isAdmin = (req, res) => {
  if (req.user && req.user.role === 'ADMIN') {
    return res.status(200).redirect('/products');
  }
  return res.redirect('/');
};
