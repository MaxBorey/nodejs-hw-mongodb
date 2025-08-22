import { User } from "../db/models/user.js";
import { Session } from "../db/models/session.js";
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import crypto from 'crypto';

const createSession = (userId) => ({
  accessToken: crypto.randomBytes(30).toString('base64'),
  refreshToken: crypto.randomBytes(30).toString('base64'),
  accessTokenValidUntil: new Date(Date.now() + 1000 * 60 * 15), //15 min
  refreshTokenValidUntil: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), //30 days
  userId,
});

export const registerUser = async (payload) => {
    const user = await User.findOne({ email: payload.email });
    
    if (user) throw createHttpError(409, 'Email in use');
    
    const encryptedPassword = await bcrypt.hash(payload.password, 10);
    
    return await User.create({
    ...payload,
    password: encryptedPassword,
  });
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Invalid email or password');
  }

  const arePasswordsEqual = await bcrypt.compare(password, user.password);

  if (!arePasswordsEqual) {
    throw createHttpError(401, 'Invalid email or password');
  }

  await Session.deleteOne({ userId: user._id });

  const session = await Session.create(createSession(user._id));

  return session;
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};

export const refreshUsersSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found!');
  }

  if (session.refreshTokenValidUntil < new Date()) {
    await Session.findByIdAndDelete(sessionId);
    throw createHttpError(401, 'Session expired!');
  }

  const user = await User.findById(session.userId);

  if (!user) {
    await Session.findByIdAndDelete(sessionId);
    throw createHttpError(401, 'Session not found!');
  }

  await Session.findByIdAndDelete(sessionId);
  const newSession = await Session.create(createSession(user._id));

  return newSession;
};
