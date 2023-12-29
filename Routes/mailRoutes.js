const express = require('express');
const {sendEmail} = require("../Controllers/sendEmailController")
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
console.log("In mail routes")
router.post('/send-mail',upload.single('file'), sendEmail);

module.exports = router;