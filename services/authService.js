const User = require("../models/User");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { generateToken } = require("../utils/jwt");

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await hashPassword(password);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  return { message: "User registered successfully" };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('_id name email password');
  if (!user) throw new Error("Invalid email, please enter valid email!");

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = generateToken({ id: user._id });

  delete user.password;
  return { token, user };
};

module.exports = {
  registerUser,
  loginUser,
};
