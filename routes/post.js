const { check } = require('express-validator');
const express = require('express')

const {getAllPosts, createPost} = require('../controllers/postController');
const roleMiddleware = require('../middleware/roleMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router()

router.get('/', getAllPosts)

router.post('/', [
  check('title', 'Title is require').notEmpty(),
  check('title', 'Title must bu between 2 and 12 letters').isLength({ min: 2, max: 20 }),

  check('body', 'Title is require').notEmpty(),
  check('body', 'Title must bu between 2 and 12 letters').isLength({ min: 2, max: 2000 })
], authMiddleware, roleMiddleware(['ADMIN']), createPost)

module.exports = router