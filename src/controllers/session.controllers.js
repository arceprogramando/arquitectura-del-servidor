import UserService from '../services/session.services.js';

class UserController {
  UserService;

  constructor() {
    this.UserService = new UserService();
  }

  createUser = async (req, res) => {
    try {
      const {
        firstname, lastname, email, age, password,
      } = req.body;
      await this.UserService.createUser({
        firstname,
        lastname,
        email,
        age,
        password,
      });

      res.redirect('/');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).json({ status: 'error', message: 'Hubo un error al registrar el usuario' });
    }
  };
}

export default UserController;
