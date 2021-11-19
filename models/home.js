'use strict';

const db = require('../db');
const { BadRequestError } = require('../expressError');

class Home {
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

module.exports = Home;
