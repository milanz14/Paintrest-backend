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
            const post = await db.query(`SELECT * FROM posts WHERE id= $1;`, [
                id,
            ]);
            return { post: post.rows[0] };
        } catch (err) {
            throw new BadRequestError(err);
        }
    }

    static async getMostRecent(numOfPosts) {
        console.log('getMostRecent running');
        try {
            const mostRecent = await db.query(
                `SELECT * FROM posts ORDER BY id DESC Limit $1;`,
                [numOfPosts]
            );
            return { posts: mostRecent.rows };
        } catch (err) {
            throw new BadRequestError(`No posts found`);
        }
    }

    // Get ID of most recent post SELECT id FROM posts ORDER BY id DESC LIMIT 1;
    // Return id, post_data, username
    static async nextPosts(numOfPosts, currLastId) {
        console.log('nextPost running');
        try {
            const nextPost = await db.query(
                `SELECT id, post_data, username FROM posts WHERE id < $1 ORDER BY id DESC Limit $2;`,
                [currLastId, numOfPosts]
            );
            return { posts: nextPost.rows };
        } catch (err) {
            throw new BadRequestError(`No posts found`);
        }
    }
}

module.exports = Posts;
