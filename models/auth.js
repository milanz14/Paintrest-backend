'use strict';

const db = require('../db');
const { ExpressError, BadRequestError } = require('../expressError');

class Auth {
  static async createUser(username, hashedPassword) {
    console.log(`Running Auth.createUser`);
    try {
      const newUser = await db.query(
        `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`,
        [username, hashedPassword]
      );

      return { message: 'User successfully created', user: newUser.rows[0] };
    } catch (err) {
      throw new BadRequestError(
        'Username already taken. Please choose a new username.'
      );
    }
  }

  static async getUser(username) {
    console.log(`Running Auth.getUser`);
    try {
      const user = await db.query(`SELECT * FROM users WHERE username = $1;`, [
        username,
      ]);
      return user.rows[0];
    } catch (err) {
      throw new ExpressError('User not found', 401);
    }
  }
}

module.exports = Auth;
