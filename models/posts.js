'use strict';

const db = require('../db');
const { BadRequestError } = require('../expressError');

class Posts {
  static async create(post_name, post_data, username) {
    console.log('Posts.create running');
    try {
      const newPost = await db.query(
        'INSERT INTO posts (name, post_data, username) VALUES ($1, $2, $3) RETURNING *',
        [post_name, post_data, username]
      );
      return { newPost: newPost.rows[0] };
    } catch (err) {
      throw new BadRequestError(err);
    }
  }

  static async getPost(id) {
    console.log('Posts.getPost running');
    try {
      const post = await db.query(`SELECT * FROM posts WHERE id= $1;`, [id]);
      return { post: post.rows[0] };
    } catch (err) {
      throw new BadRequestError(err);
    }
  }

  static async getMostRecent(numOfPosts) {
    console.log('getMostRecent running');
    try {
      const mostRecent = await db.query(
        `SELECT * FROM posts ORDER BY id DESC Limit ${numOfPosts};`
      );
      return { posts: mostRecent.rows };
    } catch (err) {
      throw new BadRequestError(`No posts found`);
    }
  }
}

module.exports = Posts;
