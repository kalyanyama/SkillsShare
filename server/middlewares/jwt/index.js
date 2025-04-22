const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const headerKey = process.env.JWT_HEADER;
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = req.header(headerKey);

  if (!token) {
    return res.status(401).json({ success: false, message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
};

module.exports = authMiddleware;
