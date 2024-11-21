import argon2 from 'argon2';

const createHash = async (password) => {
  return await argon2.hash(password);
};

const isValidPassword = async (password, user) => {
  try {
    return await argon2.verify(user.password, password);
  } catch (err) {
    return false;
  }
};

const comparePasswords = async (password, hashedPassword) => {
  try {
    return await argon2.verify(hashedPassword, password);
  } catch (err) {
    return false;
  }
};

const encrypt = {
  createHash,
  isValidPassword,
  comparePasswords,
};

export default encrypt;
