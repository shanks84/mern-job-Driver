import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import { comparePassword, hashedPassword } from "../utils/hashPassword.js";
import { UnAuthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const loginController = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) throw new UnAuthenticatedError(`Invalid credentials`);

  const isMatch = await comparePassword(req.body.password, user.password);
  if (!isMatch) throw new UnAuthenticatedError(`Invalid credentials`);

  const oneDay = 1000 * 24 * 60 * 60;
  const token = createJWT({ userId: user._id, role: user.role });
  res.cookie("token", token, {
    //means this cookie now can't be accessed with js therefore more secure.
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });

  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

export const registerController = async (req, res) => {
  const isFirstUser = (await User.countDocuments()) === 0;
  req.body.role = isFirstUser ? "admin" : "user";
  req.body.password = await hashedPassword(req.body.password);

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ user });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out" });
};
