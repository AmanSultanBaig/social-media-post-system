const bcrypt = require('bcryptjs');

const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const comparePassword = async (plainText, hashedPassword) => {
  return await bcrypt.compare(plainText, hashedPassword);
};

module.exports = {
    hashPassword,
    comparePassword
}