'use strict';

const express = require('express');
const { BadRequestError, ExpressError } = require('../expressError');
const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config');
const jwt = require('jsonwebtoken');
const Auth = require('../models/auth');

const router = express.Router({ mergeParams: true });

router.post('/register', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new ExpressError('Username and password required', 400);
        }
        const hashedPW = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const newUser = await Auth.createUser(username, hashedPW);
        // jwt.sign(payload, secret-key, jwt-options)
        let token = jwt.sign({ username }, SECRET_KEY);
        return res.json({
            message: `User ${username} successfully created`,
            user: username,
            token,
        });
    } catch (err) {
        return next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new ExpressError('Username and password required', 400);
        }
        const user = await Auth.getUser(username);
        if (!user) throw new ExpressError('User not found', 401);

        const success = await bcrypt.compare(password, user.password);

        if (success) {
            const token = jwt.sign({ username }, SECRET_KEY);
            console.log('/*/*/*/*/**/*/*/*/*/*/');
            console.log(token);
            return res.json({
                message: `Logged In as ${username}`,
                username,
                token,
            });
        } else {
            throw new ExpressError('Invalid password', 400);
        }
    } catch (err) {
        return next(err);
    }
});

// router.post('/logout', (req, res, next) => {))

module.exports = router;
