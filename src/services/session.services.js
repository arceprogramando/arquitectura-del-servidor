import UserModel from '../dao/models/user.models.js';
import encrypt from '../helpers/encrypt.js';

class UserService {
  constructor() {
    this.UserModel = UserModel;
  }

  async createUser(userData) {
    const {
      firstname, lastname, email, age, password,
    } = userData;
    const hashedPassword = await encrypt.createHash(password);
    return this.UserModel.create({
      firstname,
      lastname,
      email,
      age,
      password: hashedPassword,
    });
  }

  async loginUser(email, password) {
    const user = await this.UserModel.findOne({ email });

    if (!user || !encrypt.isValidPassword(user, password)) {
      throw new Error('Invalid credentials');
    }

    return {
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      email: user.email,
      role: user.role,
    };
  }

  async updatePassword(email, newPassword) {
    const newPasswordHashed = await encrypt.createHash(newPassword);
    const findUser = await UserModel.findOne({ email });

    if (!findUser) {
      throw new Error('Credenciales inválidas o erróneas');
    }

    const updateUser = await UserModel.findByIdAndUpdate(findUser._id, {
      password: newPasswordHashed,
    });

    if (!updateUser) {
      throw new Error('Problemas actualizando la contraseña');
    }
  }

}

export default UserService;
