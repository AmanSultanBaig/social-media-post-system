const { verifyToken } = require("../utils/jwt");
const { errorResponse } = require("../utils/response");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(
      res,
      "Access denied: Authorization token is missing or improperly formatted",
      401
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return errorResponse(res, "Invalid or expired token", 401);
  }
};
