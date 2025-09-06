import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

// Imports the secret key used to sign and verify JWTs. This should be a strong, secret string stored securely (e.g., in environment variables).
import { JWT_SECRET } from "../config/env.js";

// someone is making a request to get user detail -> authorize middleware -> verify token -> if valid -> next() -> getUser controller

const authorize = async (req, res, next) => {
  try {
    let token;

    // 1. Check for Authorization Header
    if (
      req.headers.authorization && // Checks if the 'Authorization' header exists in the incoming request
      req.headers.authorization.startsWith("Bearer") // Checks if the header value starts with "Bearer " (standard for JWTs)
    ) {
      // 2. Extract the Token
      // If the header is "Bearer <YOUR_TOKEN>", this splits the string by space
      // and takes the second part, which is the actual token.
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    // 4. Verify the Token
    // `jwt.verify()` attempts to decode and verify the token using the provided JWT_SECRET.
    // If the token is invalid (e.g., tampered, expired, wrong secret), it will throw an error.
    const decoded = jwt.verify(token, JWT_SECRET); // The `decoded` object will contain the payload originally
    // put into the token when it was signed (e.g., { userId: '...' }).

    // 5. Find the User in the Database
    // Uses the userId extracted from the decoded token payload to find the corresponding user in the database.
    // This adds an extra layer of security and ensures the user still exists and is active.
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // 7. Attach User to Request Object
    // If the token is valid and the user is found, attach the user object to the `req` object.
    // This makes the authenticated user's data (like ID, name, email) easily accessible to subsequent
    // middleware or the final route handler (e.g., `getUser`).
    req.user = user;
    console.log(user);

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized access",
    });
  }
};

export default authorize;
