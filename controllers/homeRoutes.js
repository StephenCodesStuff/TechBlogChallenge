const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../util/auth');


router.get('/', async (req, res) => {
  try {
    const blogData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs)
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
  });


  module.exports = router;


