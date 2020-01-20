const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post("/", [
  auth,
  check('text', 'Text is required').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Erro');
  }
});

// @route   GET api/posts/:pid
// @desc    Get a post by id
// @access  Private
router.get('/:pid', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid);
    if(!post) {
      return res.status(404).json({ msg: 'Post is not available!' });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post is not available!' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:pid
// @desc    Delete a post
// @access  Private
router.delete('/:pid', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid);
    // Check Post
    if (!post) {
      return res.status(404).json({ msg: 'Post is not available!' });
    }

    // Check User
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized!' });
    }

    await post.remove();
    res.json({ msg: 'Post removed successfully!' });
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post is not available!' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/like/:pid
// @desc    Like a post
// @access  Private
router.put('/like/:pid', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid);

    // LATER:
    // FIXME:
    // Check if post exist
    if (!post) {
      return res.status(404).json({ msg: 'Post yok birader!'});
    }

    // Check if the post has already been liked
    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
      return res.status(400).json({ msg: 'Post already liked!' });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post is not available!' });
    }
    // FIX:
    if(err.message == "Cannot read property 'likes' of null") {
      return res.status(400).json({ msg: "wtf" });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike/:pid
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:pid', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid);

    // Check if the post has already been liked
    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
      return res.status(400).json({ msg: 'Post hast not been liked yet!' });
    }

    post.likes = post.likes.filter(like => like.user != req.user.id);

    await post.save();
    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post is not available!' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/posts/comment/:pid
// @desc    Comment on a post
// @access  Private
router.post("/comment/:pid", [
  auth,
  check('text', 'Text is required').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.pid);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);

    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post is not available!' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/comment/:pid/:commid
// @desc    Delete a comment
// @access  Private
router.delete('/comment/:pid/:commid', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.pid);

    // Pull out comment
    const comment = post.comments.find(comm => comm.id === req.params.commid);

    // Make sure comment exists
    if(!comment) {
      return res.status(404).json({ msg: 'Comment not found!' });
    }

    // Check User
    // FIX: Maybe post owner should also have the right of deleting comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized!' });
    }

    // FIX: method is probably wrong
    // Get remove index
    const removeIndex = post.comments.map(comm => comm.user.toString()).indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);

    await post.save();
    // res.json({ msg: 'Post removed successfully!' });
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post is not available!' });
    }
    res.status(500).send('Server Error');
  }
});


module.exports = router;