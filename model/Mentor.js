var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MentorSchema = new Schema({
    phase: {
        name: String,
        start_date: Number,
        end_date: Number,
        watering: {
            day: {
                time: Number,
                value: Number
            },
            night: {
                time: Number,
                value: Number
            }
        },
        light: {
            day: Number,
            night: Number
        },
        temperature: {
            day: Number,
            night: Number
        },
        humidity: {
            day: Number,
            night: Number
        },
        ventilation: {
            day: {
                time: Number,
                value: Number
            },
            night: {
                time: Number,
                value: Number
            }
        },
        air:{
            o2:Number,
            co2:Number
        }
    }
});
var engines = mongoose.model('Mentor', MentorSchema);
module.exports = engines;