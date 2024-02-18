const jwt = require("jsonwebtoken");
const { unAuth } = require("../errors");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new unAuth("No Token provided");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { _id, username } = decoded;
    req.user = { _id, username };
    next();
  } catch (error) {
    throw new unAuth("Not authorized to access this page");
  }
};
module.exports = authMiddleware;
