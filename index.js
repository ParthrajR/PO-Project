const express = require('express');
const app = express();
const venderRoutes = require('./Routes/venderRoutes');
const billRoutes = require('./Routes/billRoutes')
const shipRoutes = require('./Routes/shipRoutes')
const mongoose = require('mongoose');
const port = 1210;
const url = "mongodb://localhost:27017/PO-Project"

app.use(express.json());

app.use('/api/vender', venderRoutes);
app.use('/api/bill', billRoutes);
app.use('/api/ship', shipRoutes);


mongoose.connect(url, {}).then(result => console.log("Database Connected")).catch(err => console.log(err))

app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
  });

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})


