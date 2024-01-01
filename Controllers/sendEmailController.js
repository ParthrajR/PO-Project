const nodemailer = require("nodemailer");
const cors = require("cors");
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs/promises'); // Using fs.promises for async file operations

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// const transporter = nodemailer.createTransport({
//     // service: "Gmail",
//     // auth: {
//     //     user: 'parthraj.rathod2508@gmail.com',
//     //     pass: 'npmn eyst uxdc whvk'
//     // },
//     // // port: 587,
//     // // secure: true, // use TLS
//     // // requireTLS: true, // require TLS
//     // // tls: {
//     // //   rejectUnauthorized: false, // ignore unauthorized TLS errors for testing only
//     // // },

    
// });

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'susanna.mueller74@ethereal.email',
        pass: 'a8e3EB2jQ2Y9t2gfFa'
    }
});

const sendEmail = async (req, res) => {
    try {
        const { to, subject, file } = req.body;
        console.log("file Type", req)
        const pdfBuffer = req.file.buffer;

        // console.log('Received PDF:', pdfBuffer.toString('base64'));

        // console.log("pdfbufffff", pdfBuffer)
        // // Convert the attachment to base64
        // // const base64Pdf = Buffer.from(attachment, 'binary').toString('base6

        const mailOptions = {
            // from: "shreeganeshpob@gmail.com",
            from: "parthraj.rathod2508@gmail.com",
            to,
            subject,
            attachments: [
                {
                    filename: "purchase_order.pdf", // assuming it's a pdf file
                    content: pdfBuffer ,
                    encoding: "base64", // specify encoding as 'base64'
                },
            ],
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({ error: "Error sending email" });
    }
};

// app.post('/api/send-email', sendEmail);

module.exports = {sendEmail};
