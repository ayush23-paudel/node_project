import express from 'express';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import createToken from '../utils/utils.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { fullname, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) return res.status(400).send({ error: ' already registered !!!' });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({ fullname, email, password: hashedPassword });
  res.send({ message: 'User registered!', user: newUser });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send({ error: 'Who are u ? i dont know you (^-^)user not registered !!' });

  if (await bcrypt.compare(password, user.password)) {
    const token = createToken(user._id);
    res.send({ message: 'Login Success!', token });
  } else {
    res.status(400).send({ error: 'Invalid Password try again !' });
  }
});

export default router;
