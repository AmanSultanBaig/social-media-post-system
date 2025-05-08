const successResponse = (res, message, code = 200, data = {}) => {
  return res.status(code).json({
    status: "success",
    code,
    message,
    data,
  });
};

const errorResponse = (res, message, code = 400, data = {}) => {
  return res.status(code).json({
    status: "error",
    code,
    message,
    data,
  });
};

module.exports = { successResponse, errorResponse }