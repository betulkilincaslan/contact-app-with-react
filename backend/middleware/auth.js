import jwt from "jsonwebtoken";

// To protect private routes
export default async (req, res, next) => {
  // Get token from header
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.jwtSecret);

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
