var jwt = require('jsonwebtoken'); 
var config = require('../config'); 
var x_access_token = 'x-access-token';
var no_token_found = 'No token provided.';
var failed_authenticate = 'Failed to authenticate token.';
var localStorage = require('localStorage');
function verifyToken(req, res, next) {

  var token = req.headers[x_access_token] || req.cookies["access_token"] || localStorage.getItem('token');
  token = JSON.parse(token);
    console.log(`token request = ${token}`);
  if (!token) 
    return res.status(403).send({ auth: false, message:  no_token_found});

    jwt.verify(token, config.secret, function(err, decoded) {      
    if (err) 
      return res.status(500).send({ auth: false, message: failed_authenticate });    

    req._id = decoded.id;
    next();
  });

}

module.exports = verifyToken;