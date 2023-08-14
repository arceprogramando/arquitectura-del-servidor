import UserModel from '../dao/models/user.models.js';
import encrypt from '../helpers/encrypt.js';

class UserService {
  constructor() {
    this.UserModel = UserModel;
  }

  createUser = async (userData) => {
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
  };
}

export default UserService;
