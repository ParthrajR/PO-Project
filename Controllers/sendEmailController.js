const nodemailer = require("nodemailer");
const cors = require("cors");
const express = require('express');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'parthrajrathod1998@gmail.com',
        pass: 'bbyv zmqp vrpp itfr'
    },
});

const sendEmail = async (req, res) => {
    try {
        const { to, subject, file } = req.body;

        const pdfBuffer = req.file.buffer;

        console.log("pdfbufffff", pdfBuffer)
        // Convert the attachment to base64
        // const base64Pdf = Buffer.from(attachment, 'binary').toString('base64');

        const mailOptions = {
            from: "shreeganeshpob@gmail.com",
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
