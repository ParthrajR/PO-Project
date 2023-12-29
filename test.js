// 
const fs = require('fs');

const base64String = 'SGVsbG8gd29ybGQKVGhpcyBkYXRhIGlzIGEgbmV3IGxpbmUgTW9kZWw=';

// Decode Base64 string
const decodedData = Buffer.from(base64String, 'base64');

// Save as a PDF file
fs.writeFileSync('output.pdf', decodedData, 'utf-8');

console.log('PDF file saved as output.pdf');
