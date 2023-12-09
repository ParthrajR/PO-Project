const express = require('express');
const app = express();
require('dotenv').config();
const venderRoutes = require('./Routes/venderRoutes');
const billRoutes = require('./Routes/billRoutes')
const shipRoutes = require('./Routes/shipRoutes')
const itemRoutes = require('./Routes/itemRoutes')
const mongoose = require('mongoose');
const url = process.env.MONGO_URL;

const port = 1210;

app.use(express.json());

app.use('/api/vender', venderRoutes);
app.use('/api/bill', billRoutes);
app.use('/api/ship', shipRoutes);
app.use('/api/item', itemRoutes);


// Connect to MongoDB using mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('helllllllllllll  Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
  });

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})


