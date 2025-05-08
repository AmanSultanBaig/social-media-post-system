const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const postRoutes = require('./post');

router.use('/posts', postRoutes);
router.use('/auth', authRoutes);

module.exports = router;
