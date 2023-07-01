const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../util/auth');

router.post('/', withAuth, async (req, res) => {
    try {
      const newBlogPost = await Post.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newBlogPost);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  router.delete('/:id', withAuth, async (req, res) => {
    try {
      const blogPostData = await Post.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!blogPostData) {
        res.status(404).json({ message: 'No post found with this ID' });
        return;
      }
  
      res.status(200).json(blogPostData);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;
