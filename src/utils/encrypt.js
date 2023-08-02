import bcrypt from 'bcrypt';

const createHash = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const encrypt = {
  createHash,
  isValidPassword,
};

export default encrypt;
