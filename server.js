require('dotenv').config();

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const notFoundMiddleware = require('./middleware/not-found');
const taskroutes = require('./routes/taskRouter')
const rateLimit = require("express-rate-limit");



//  Rate Limiting Middleware (Limit to 100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Max 100 requests per IP
  message: { success: false, message: "Too many requests, please try again later." },
  standardHeaders: true, // Return rate limit info in headers
  legacyHeaders: false, // Disable deprecated headers
});

app.use(limiter); 

// middleware
app.use(express.json()); 

// routes
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/tasks', taskroutes);

// products route

app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // connectDB
// MONGO_URI=mongodb://localhost:27017/store-api
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();