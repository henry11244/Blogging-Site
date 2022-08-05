const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        // Get all projects and JOIN with user data
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ]
        });

        // Serialize data so the template can read it
        const blogs = blogData.map((blog) => blog.get({ plain: true }));
        // Pass serialized data and session flag into template
        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        })

    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/Blog/:id', async (req, res) => {
    try {
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
            ],
        });

        const blog = blogData.get({ plain: true });

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(1, {
            include: [
                {
                    model: Blog,

                },]
        });
        const user = userData.get({ plain: true });
        res.render('dashboard', {
            ...user,
            logged_in: true

        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Use withAuth middleware to prevent access to route
router.get('/editBlog', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const blogData = await Blog.findByPk(1, {
            include: [
                {
                    model: Blog,

                },]
        });
        const user = userData.get({ plain: true });
        res.render('dashboard', {
            ...user,
            logged_in: true

        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// router.get('/dashboard', async (req, res) => {
//     try {
//         // Get all projects and JOIN with user data
//         const blogData = await Blog.findAll({ where: { user_id: req.session.user_id } });

//         // Serialize data so the template can read it
//         const blogs = blogData.map((blog) => blog.get({ plain: true }));
//         console.log(blogs)
//         // Pass serialized data and session flag into template
//         res.render('homepage', {
//             blogs,
//             logged_in: req.session.logged_in
//         });
//     } catch (err) {
//         res.status(500).json(err);
//     }
// });

router.get('/newBlog', withAuth, (req, res) => {
    res.render('newBlog')
});

module.exports = router;