import UserRepository from '../repository/user.repository.js';
import encrypt from '../helpers/encrypt.js';
// import UserModel from '../model/user.models.js';

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  createUser = async (userData) => {
    try {
      const {
        firstname, lastname, email, age, password,
      } = userData;
      const hashedPassword = await encrypt.createHash(password);
      const newUser = {
        firstname,
        lastname,
        email,
        age,
        password: hashedPassword,
      };
      const createdUser = await this.userRepository.createUser(newUser);
      return createdUser;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  };

  // loginUser = async (email, password) => {
  //   const user = await this.userModel.findOne({ email });

  //   if (!user || !encrypt.isValidPassword(user, password)) {
  //     throw new Error('Invalid credentials');
  //   }

  //   return {
  //     firstname: user.firstname,
  //     lastname: user.lastname,
  //     age: user.age,
  //     email: user.email,
  //     role: user.role,
  //   };
  // };

  // updatePassword = async (email, newPassword) => {
  //   const newPasswordHashed = await encrypt.createHash(newPassword);
  //   const findUser = await this.userRepository.findOne({ email });

  //   if (!findUser) {
  //     throw new Error('Credenciales inválidas o erróneas');
  //   }

  //   const updateUser = await this.userRepository.findByIdAndUpdate(findUser._id, {
  //     password: newPasswordHashed,
  //   });

  //   if (!updateUser) {
  //     throw new Error('Problemas actualizando la contraseña');
  //   }
  // };

}

export default UserService;
