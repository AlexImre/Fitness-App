const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const User = connection.models.User;
const { isAuth, isAdmin } = require('./authMiddleware');

/**
 * -------------- POST ROUTES ----------------
 */

//  router.post('/login', 
//     passport.authenticate('local', { failureRedirect: '/Analytics', failureMessage: true, successRedirect: '/Home' }), 
//     (req, res, next) => {
//         res.send(req.user);
//  });

router.post('/login', 
    passport.authenticate('local', { failureMessage: true, successRedirect: '/Home' }));

 router.post('/register', (req, res, next) => {
    // ADD CHECK TO SEE IF NAME ALREADY EXISTS!
    console.log('You just hit the post /register end point.');
    console.log(req.body);
    const saltHash = genPassword(req.body.pw);
    const salt = saltHash.salt;
    const hash = saltHash.hash;

    const newUser = new User({
        username: req.body.uname,
        hash: hash, 
        salt: salt,
        admin: true
    });

    newUser.save()
        .then((user) => {
            console.log(user);
        });

    res.redirect('/login');
 });

 /**
 * -------------- GET ROUTES ----------------
 */

router.get('/', (req, res, next) => {
    res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>');
});

router.get('/login', (req, res, next) => {
    const form = '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>';
    res.send(form);
});

// router.get('/register', (req, res, next) => {
//     const form = '<h1>Register Page</h1><form method="post" action="register">\
//                     Enter Username:<br><input type="text" name="uname">\
//                     <br>Enter Password:<br><input type="password" name="pw">\
//                     <br><br><input type="submit" value="Submit"></form>';
//     res.send(form);
// });

router.get('/Analytics', (req, res, next) => {
    console.log('You made it to Analytics route');
    // res.redirect('/Analytics');
});

router.get('/protected-route', isAuth, (req, res, next) => {
    res.send('You made it to the route.');
});

router.get('/admin-route', isAdmin, (req, res, next) => {
    res.send('You made it to the admin route.');
});

// Visiting this route logs the user out
router.get('/logout', (req, res, next) => {
    req.logout();
    // dont need below redirect
    res.redirect('/protected-route');
});

router.get('/login-success', (req, res, next) => {
    res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
    res.send('You entered the wrong password.');
});

module.exports = router;