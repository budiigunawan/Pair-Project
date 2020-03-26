var nodemailer = require('nodemailer');

function mail(receiver) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'pairproject41@gmail.com',
            pass: 'hacktiv8!'
        }
    });
    
    var mailOptions = {
        from: 'pairproject41@gmail.com',
        to: receiver,
        subject: 'Subject Email',
        text: 'Halo....terima kasih sudah bergabung di Edvent.'
    };
    
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) throw err;
        console.log('Email sent: ' + info.response);
    });
}

module.exports = mail