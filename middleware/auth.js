import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const checkAuth = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).send({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(verified._id);
    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid token' });
  }
};

export default checkAuth;
