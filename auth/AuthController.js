var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var verifyToken = require('./VerifyToken');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(cookieParser("secret"));

var User = require('../user/User');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require("../config");
var email = require('../email/SendEmailController');
var mail = require('../email/config').EMAIL;
var constants = require('../constants/config');

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
router.post('/register', function (req, res) {
    var hashPassword = bcrypt.hashSync(req.body.password, 8);
    var activeCode = getRandomInt(1000000000);
    User.create(
        {
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            phone: req.body.phone,
            active: false,
            activeCode: null
        },
        function (err, user) {
            if (err) res.status(500).json({ message: 'there was a problem to create a new user.', code: 500 });
            var url = `http://localhost:3000/active-account`;
            email.sendEmail(req.body.name, activeCode, url);
            return res.status(200).json({ message: `Please active your account, We are sending active code to your email: ${mail}`, code: 200 });
        }
    )
});

router.post('/forgot-password', function (req, res) {
    var email = req.body.email;
    var activeCode = getRandomInt(1000000000);
    User.updateOne({ email: email }, { $set: { "activeCode": { "activeCode": activeCode, "created": new Date() } } },
        function (err, user) {
            if (err) return res.status(500).json({ message: constants.INTERNAL_SERVER, code: 500 });
            if (!user) return res.status(400).json({ message: constants.EMAIL_NOT_EXIST, code: 400 });

            var username = user.name;
            var url = `http://localhost:3000/active-account`;
            email.sendEmail(username, activeCode, url);
            return res.status(200).json({message:constants.SUCCESS, code:200})
        });
});

router.post('/active-account', function (req, res) {
    var activeCode = req.body.activeCode;
    User.findOne({ activeCode: activeCode }, function (err, user) {
        if (err) return res.status(500).json({ message: constants.INTERNAL_SERVER, code: 500 });
        if (!user) return res.status(400).json({ message: constants.ERROR_ACTIVE_CODE, code: 400 });
        var date = new Date();
        var time = user.created;
        var mins = Math.round((date - time) / (1000 * 60));
        console.log(mins);
        if (mins <= 5) {
            var token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 84000
            });
            return res.status(200).json({ auth: true, token: token });
        } else {
            res.status(400).json({ message: constants.ERROR_ACTIVE_CODE_EXPIRED, code: 200 });
        }
    })
});

router.post('/login', function (req, res) {
    var email = req.body.email;
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) return res.status(500).json({ message: constants.INTERNAL_SERVER, code: 500 });

        if (!user) {
            return res.status(400).json({ message: constants.USER_NOTFOUND, code: 400 });
        }
        var password = bcrypt.compareSync(req.body.password, user.password);
        if (!password) return res.status(401).json({ message: constants.USER_NOTFOUND, code: 400 });
        var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 84000
        });
        return res.status(200).json({ auth: true, token: token });
    });
});

router.get('/me', verifyToken, function (req, res, next) {
    User.findById(req._id, { password: 0 }, function (err, user) {
        if (err) return res.status(500).json({ message: constants.INTERNAL_SERVER, code: 500 });
        if (!user) return res.status(400).json({ message: constants.REQUIRED_LOGIN, code: 400 });
        return res.status(200).json(user);
    });
});

router.get('/logout', function (req, res) {
    res.status(200).send({ auth: false, token: null, code: 200 });
});

module.exports = router;