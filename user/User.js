var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    phone: Number,
    active: { type: Boolean, default: false },
    activeCode: {
        activeCode: Number,
        created: { type: Date, default: new Date() }
    },
    created: { type: Date, default: new Date() }
});
var users = mongoose.model('User', UserSchema);
module.exports = users;
