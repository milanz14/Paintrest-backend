'use strict';

const express = require('express');
const app = require('../app');
const { BadRequestError } = require('../expressError');
const Posts = require('../models/posts');

const router = express.Router({ mergeParams: true });

// returns {newPost: {postDetails}}
router.post('/new', async (req, res, next) => {
  try {
    const { post_name, post_data, username } = req.body;
    const newPost = await Posts.create(post_name, post_data, username);
    return res.status(201).json(newPost);
  } catch (err) {
    next(err);
  }
});

// returns {post: {postDetails}}
router.get('/id/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await Posts.getPost(id);
    return res.status(201).json(post);
  } catch (err) {
    next(err);
  }
});

router.get('/count/:numPosts', async (req, res) => {
  const numPosts = parseInt(req.params.numPosts);
  console.log(typeof numPosts);
  if (typeof numPosts !== 'number') {
    throw new BadRequestError('invalid number input');
  }

  const mostRecentPosts = await Posts.getMostRecent(numPosts);
  return res.status(201).json(mostRecentPosts);
});

module.exports = router;
