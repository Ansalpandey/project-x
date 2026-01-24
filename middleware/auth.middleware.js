import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (token) {
      token = token.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { _id: decoded.user.id, username: decoded.user.username }; // Ensure _id matches the expected property in the token payload
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export { auth };
