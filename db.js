var mongoose = require('mongoose');
var config = require('./config');
// var connectDB = `mongodb://`+config.username+`:`+config.password+`@ds247223.mlab.com:47223/iot`;
var connectDB = `mongodb://localhost:27017/iot`;
mongoose.connect(connectDB, function(error){
    if (error) {
        console.log(`Mongodb connect failed.`);
    }
});
console.log('mongo db is connected');