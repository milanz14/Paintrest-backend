'use strict';

const db = require('../db');
const { BadRequestError } = require('../expressError');

class User {
  // requires logged in and authorized user
  static async getUserAndPosts(username) {
    console.log('getUserAndPosts running');
    try {
      const user = await db.query(
        `
      SELECT id, username, created_at FROM users
      WHERE username = $1;
    `,
        [username]
      );

      if (!user) {
        throw new BadRequestError(`User ${username} not found`);
      }

      const posts = await db.query(
        `SELECT name, post_data FROM posts WHERE username = $1;`,
        [username]
      );
      return { user: user.rows[0], posts: posts.rows };
    } catch (err) {
      return err;
    }
  }

  // Anyone can use
  static async getUserPosts(username) {
    console.log('running getUserPosts');
    try {
      const posts = await db.query(
        `SELECT name, post_data FROM posts WHERE username = $1;`,
        [username]
      );
      return { posts: posts.rows };
    } catch (err) {
      return err;
    }
  }
}

module.exports = User;
