import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import blogRouter from './routes/blogRouter.js';
import userRouter from './routes/userRouter.js';

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log('Error connecting to DB:', err.message));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/blogs', blogRouter);
app.use('/api/auth', userRouter);

app.listen(3000, () => console.log('Server is up and running'));

