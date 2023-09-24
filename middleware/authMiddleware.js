import {
  UnAuthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import User from "../models/UserModel.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    throw new UnAuthenticatedError("Please login first/Authentication invalid");

  try {
    const data = verifyJWT(token);
    const { userId, role } = data;
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Please login first/Authentication invalid");
  }
};
/*The rest parameter syntax allows a function to accept 
an indefinite number of arguments as an array, providing a way
 to represent variadic functions in JavaScript
 */
export const authorizePermission = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new UnauthorizedError("Unauthorize to access this route");
    next();
  };
};
