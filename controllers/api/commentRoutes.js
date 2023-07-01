const router = require('express').Router();
const { Post, Comment, User } = require('../../models');
const withAuth = require('../../util/auth');

router.get("/", (req, res) => {
  Comment.findAll({
    attributes: ["id", "comment_text", "user_id", "post_id"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
    ],
  }) //include the posts and comments of this user
    .then((commentData) => {
      res.json(commentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}); 

router.post('/:postId/', withAuth, async (req, res) => {
  try {
    // Find the post by ID
    const post = await Post.findByPk(req.params.postId);
    console.log(post)

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Create a new comment
    const comment = await Comment.create({
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id,
    });

    // Associate the comment with the post
    await comment.setPost(post);

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

  module.exports = router;