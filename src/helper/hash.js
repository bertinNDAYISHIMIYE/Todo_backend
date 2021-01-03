/* eslint-disable no-shadow */
/* eslint-disable import/prefer-default-export */
import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(password, salt);
    return hashPassword;
  } catch (error) {
    return null;
  }
};
