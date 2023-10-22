import jwt from 'jsonwebtoken';

export const getMe = async (token) => {
  try {
    const isValid = jwt.verify(token, process.env.JWT_SECRET);
    return isValid;
  } catch (error) {
    return {
      error: 'Token inválido',
    };
  }
};
