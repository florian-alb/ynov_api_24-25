import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  let token = req.headers?.authorization; // Get the token from the headers

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  token = token.replace("Bearer ", ""); // Remove the Bearer part from the token (it's a convention)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!); // Verify the token
    // Add the user to the request object, to be used in the next controller
    req.user = decoded;
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};
