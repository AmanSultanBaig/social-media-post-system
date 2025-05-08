const authService = require("../services/authService");
const { successResponse, errorResponse } = require('../utils/response');

const signup = async (req, res) => {
  try {
    await authService.registerUser(req.body);
    return successResponse(res, 'User registered successfully', 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    return successResponse(res, 'Login successful', 200, result);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

module.exports = { login, signup };
