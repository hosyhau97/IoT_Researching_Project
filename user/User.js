var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
name:String,
email:String,
password:String,
phone:Number,
active : false,
activeCode:Number
});
var users= mongoose.model('User',UserSchema);
module.exports= users;
