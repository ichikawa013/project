import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized: No token provided." });
    }

    const token = authHeader.split(" ")[1]; // Extract the token

    // Check if the token is empty or malformed
    if (!token || token === "") {
      return res.status(401).json({ message: "Unauthorized: Invalid token." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = { id: decoded.id }; // Attach user info (decoded payload) to the request object
    next(); // Proceed to the next middleware or controller
  } catch (err) {
    console.error("Error in authMiddleware:", err.message);

    // Check specific JWT error names for better handling
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Unauthorized: Invalid token." });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired." });
    }

    // Default error message for other errors
    return res.status(500).json({ message: "Token verification failed.", error: err.message });
  }
};

export default authMiddleware;
