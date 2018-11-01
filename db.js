var mongoose = require('mongoose');
var config = require('./config');
var connectDB = `mongodb://`+config.username+`:`+config.password+`@ds247223.mlab.com:47223/iot`;
mongoose.connect(connectDB);
console.log('mongo db is connected');