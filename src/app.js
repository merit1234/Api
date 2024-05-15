const express = require('express');
const connectDB = require('./services/databaseConnection');
const applicationRoutes = require('./routes/route');
const cookieParser = require('cookie-parser');
const logger = require('./services/winstonLogger');
const errorHandler = require('./middlewares/errorHandler');


const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();


// Middleware
app.use(express.json());
// Error handling middleware with Wiston Logger to capture and log all errors
app.use(errorHandler);
//express cookie parser
app.use(cookieParser());


// Routes
app.use(applicationRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  logger.info(err.stack)
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`)
});
