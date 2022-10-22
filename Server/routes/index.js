const router = require('express').Router();
const passport = require('passport');
const genPassword = require('../lib/passwordUtils').genPassword;
const connection = require('../config/database');
const User = connection.models.User;
const { isAuth, isAdmin } = require('./authMiddleware');

/**
 * -------------- POST ROUTES ----------------
 */

router.post('/login', 
    passport.authenticate('local'), 
    (req, res, next) => {
        console.log('made it to login API endpoint');
        res.send();
    });

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

router.post('/addEvent', async (req, res, next) => {
    console.log('You made it to addevent API endpoint!');
    console.log(req.body);
    console.log(req.user);
    const newEvent = req.body.newEvent;
    const user = await User.findOne({ username: req.user.username });
    console.log(user);
    user.test = req.body.test;
    user.allEvents.push(newEvent);
    await user.save();
    res.send(user);
})

 /**
 * -------------- GET ROUTES ----------------
 */

router.get('/auth', isAuth, (req, res, next) => {
    console.log('You made it to auth route');
    // res.send();
});

// log user out
router.get('/logout', (req, res, next) => {
    req.logOut();

    // NOT SURE THIS IS BEST PRACTICE?
    req.session.destroy();
});

module.exports = router;