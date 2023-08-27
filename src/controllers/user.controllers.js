import UserService from '../services/user.services.js';

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
      res.status(500).json({ status: 'error', message: `Hubo un error al registrar el usuario ${error}` });
    }
  };

  // loginUser = async (req, res) => {
  //   try {
  //     const { email, password } = req.body;
  //     const user = await this.userService.loginUser(email, password);

  //     req.user.user = {
  //       firstname: user.firstname,
  //       lastname: user.lastname,
  //       age: user.age,
  //       email: user.email,
  //       role: user.role,
  //     };

  //     res.redirect('/products');
  //   } catch (error) {
  //     console.error('Error al iniciar sesión:', error);
  //     res.status(400).send({ status: 'error', error: 'Credenciales inválidas en user' });
  //   }
  // };

  // logoutUser = async (req, res) => {
  //   try {
  //     req.user.destroy();

  //     return res.redirect('/');
  //   } catch (error) {
  //     console.error('Error al cerrar la sesión:', error);
  //     return res.status(500).json({ status: 'Error al cerrar la sesión', error: error.message });
  //   }
  // };

  // resetPassword = async (req, res) => {
  //   try {
  //     const { email, newpassword } = req.body;

  //     await this.userService.updatePassword(email, newpassword);

  //     return res.redirect('/');
  //   } catch (error) {
  //     console.error('Error al actualizar la contraseña:', error);
  //     return res.status(500).json({ status: 'Error al actualizar la contraseña', error: error.message });
  //   }
  // };

  // authenticateGitHub = async (req, res) => {
  //   try {
  //     const authenticatedUser = req.user;
  //     console.log('🚀 ~ file: user.controllers.js:75 ~ UserController ~ authenticateGitHub= ~ authenticatedUser:', authenticatedUser);
  //     res.redirect('/product');
  //   } catch (error) {
  //     console.error('Error en la autenticación de GitHub:', error);
  //     res.status(500).json({ message: 'Error en la autenticación de GitHub' });
  //   }
  // };

  // handleGitHubCallback = async (req, res) => {
  //   try {
  //     console.log('***Usuario endpoint de github/callback para comunicarnos***');
  //     req.user.user = req.user;
  //     res.redirect('/profile');
  //   } catch (error) {
  //     console.log('Error en el callback de GitHub:', error);
  //     res.status(500).json({ message: 'Error en la autenticación de GitHub' });
  //   }
  // };
}

export default UserController;
