import bcrypt from 'bcrypt';

const createHash = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

const comparePasswords = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

const encrypt = {
  createHash,
  isValidPassword,
  comparePasswords,
};

export default encrypt;
