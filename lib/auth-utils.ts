import bcrypt from "bcrypt";

export const hashPW = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

export const comparePW = async (
  password: string,
  hashedPW: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPW);
};
