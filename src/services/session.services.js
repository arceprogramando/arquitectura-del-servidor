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

    if (!user || !(await encrypt.isValidPassword(user, password))) {
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
}

export default UserService;
