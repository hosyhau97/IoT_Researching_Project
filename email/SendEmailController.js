var nodeMailer = require('nodemailer');
var config = require('./config');

module.exports.sendEmail = function (name, code, url) {

    var templateHTML = config.HTML(name, code, url);

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: config.EMAIL,
            pass: config.PASSWORD
        }
    });
    let mailOptions = {
        from: config.EMAIL,
        to: config.EMAIL,
        subject:'Active code',
        html: templateHTML
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Failed to send email.');
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}
