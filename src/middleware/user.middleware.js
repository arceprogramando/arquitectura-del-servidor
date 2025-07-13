const userMiddleware = (req, res, next) => {
  const userObject = req.user ? req.user.toObject() : null;

  res.locals.user = userObject;

  res.locals.isAuthenticated = !!req.user;

  if (req.user) {
    res.locals.userRole = req.user.role;
    res.locals.isAdmin = req.user.role === 'ADMIN';
    res.locals.isPremium = req.user.role === 'PREMIUM';
    res.locals.isUser = req.user.role === 'USER';
  }

  next();
};

export default userMiddleware;
