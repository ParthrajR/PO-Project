const express = require('express');
const app = express();
require('dotenv').config();
const venderRoutes = require('./Routes/venderRoutes');
const billRoutes = require('./Routes/billRoutes');
const shipRoutes = require('./Routes/shipRoutes');
const itemRoutes = require('./Routes/itemRoutes');
const shipViaRoutes = require('./Routes/shipViaRoutes');
const cors = require('cors');

const mongoose = require('mongoose');

const port = 1210;

const corsOptions = {
  origin: 'http://localhost:1312',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));


// Build the MongoDB connection URL
const dbUrl = `${process.env.MONGO_URL}${process.env.DATABASE_NAME}`;

// Set up the MongoDB connection
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event listeners for connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully');
});

// Export the Mongoose instance for use in other parts of the application
module.exports = mongoose;


app.use(express.json());

app.use('/api/vender', venderRoutes);
app.use('/api/bill', billRoutes);
app.use('/api/ship', shipRoutes);
app.use('/api/item', itemRoutes);
app.use('/api/shipVia', shipViaRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
  });
});

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
