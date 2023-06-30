const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../util/auth');


router.post('/', withAuth, async (req, res) => {
    try {
        
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.body.post_id,
        })
        console.log (newComment)
      res.status(200).json(comment);
    } catch (err) {
        res.status(400).json(err);
    }
  });

  module.exports = router;