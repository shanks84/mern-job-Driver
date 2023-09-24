import bcrypt from "bcryptjs";

export const hashedPassword = async (password) => {
  const Salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, Salt);
};

export const comparePassword = async (password, hashedPassword) => {
  const isValidPassword = await bcrypt.compare(password, hashedPassword);
  return isValidPassword;
};
