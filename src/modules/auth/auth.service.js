import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { save, getByEmail } from '../user/index.js';

export const login = async (params) => {
  const user = await getByEmail(params.email);

  if (!user) {
    return { error: 'E-mail ou senha inválidos' };
  }

  const passwordCorrect = bcrypt.compareSync(params.password, user.password);
  if (!passwordCorrect) {
    return { error: 'E-mail ou senha inválidos' };
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  return { token };
};

export const register = async (params) => {
  const user = await getByEmail(params.email);

  if (user) {
    return { error: 'Este e-mail já está cadastrado' };
  }

  const userCreated = await save(params);

  const token = jwt.sign({ id: userCreated[0] }, process.env.JWT_SECRET);
  return { token };
};
