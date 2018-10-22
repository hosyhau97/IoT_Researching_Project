var jwt = require('jsonwebtoken'); 
var config = require('../config'); 
var localStorage = require('localStorage');

module.exports.filterToken = function(req, res, next) {
    var token =localStorage.getItem('token');
    if (!token) 
      return false;
  
      jwt.verify(token, config.secret, function(err, decoded) {      
      if (err) 
        return false;    
  
      req._id = decoded.id;
      next();
    });
    
    return true;
  }