const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const postRoutes = require('./post');

router.use('/post', postRoutes);
router.use('/auth', authRoutes);

module.exports = router;
