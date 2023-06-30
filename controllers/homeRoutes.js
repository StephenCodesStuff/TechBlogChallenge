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
          // {
          //   model: Comment,
          //   as: "comments",
          //   attributes: ["id", "body", "date_created", "user_id"],
          // },
      ],
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    console.log(blogs)
    res.render('homepage', { 
      blogs,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
  });
  
  router.get('/dashboard', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
      console.log(userData)
      

      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // router.get('/editpost/:id', async (req, res) => {
  //   try {
  //     const postData = await Post.findByPk(req.params.id, {
  //       include: [
  //         {
  //           model: User,
  //           attributes: [''],
  //         },
  //       ],
  //     });
  
  //     const blog = postData.get({ plain: true });
  
  //     res.render('editpost', {
  //       ...blog,
  //       logged_in: req.session.logged_in
  //     });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // });

  router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
  
    res.render('login');
  });

  router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    res.render('signup');
  });

  module.exports = router;


