import express from 'express';
import Blog from '../models/blogModel.js';
import checkAuth from '../middleware/auth.js';

const router = express.Router();


router.get('/', checkAuth, async (req, res) => {
  const id = req.query.id;
  if (id) {
    const blog = await Blog.findById(id);
    if (blog) res.send({ requestedBy: req.user, blog });
    else res.status(404).send({ message: 'Blog not found' });
  } else {
    const blogs = await Blog.find();
    res.send({ requestedBy: req.user, blogs });
  }
});


router.post('/', checkAuth, async (req, res) => {
  await Blog.create({ ...req.body, user: req.user._id });
  res.send({ message: 'Blog added' });
});


router.put('/:id', checkAuth, async (req, res) => {
  const id = req.params.id;
  const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: req.body }, { new: true });
  res.send({ message: 'Blog Updated', blog: updatedBlog });
});

export default router;
