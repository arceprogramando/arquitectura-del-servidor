import UserService from '../services/session.services.js';

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  createUser = async (req, res) => {
    try {
      const {
        firstname, lastname, email, age, password,
      } = req.body;
      await this.userService.createUser({
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

  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await this.userService.loginUser(email, password);

      req.session.user = {
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        email: user.email,
        role: user.role,
      };

      res.redirect('/products');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(400).send({ status: 'error', error: 'Credenciales inválidas en session' });
    }
  };

  logoutUser = async (req, res) => {
    try {
      req.session.destroy();

      return res.redirect('/');
    } catch (error) {
      console.error('Error al cerrar la sesión:', error);
      return res.status(500).json({ status: 'Error al cerrar la sesión', error: error.message });
    }
  };

  resetPassword = async (req, res) => {
    try {
      const { email, newpassword } = req.body;

      await this.userService.updatePassword(email, newpassword);

      return res.redirect('/');
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      return res.status(500).json({ status: 'Error al actualizar la contraseña', error: error.message });
    }
  };
}

export default UserController;
