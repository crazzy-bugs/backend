import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './config/swagger';
import morganMiddleware from './middlewares/logger';
import errorHandler from './middlewares/errorHandler';
import userRoutes from './routes/user'; // Import userRoutes
import routes from './routes'; // Import the general routes
import connectDB from './config/db';
import mongoose from 'mongoose';

// Initialize express
const app = express();

connectDB().then(() => {
  // Assign the connection to app.locals after connecting
  app.locals.db = mongoose.connection;
});

// Setup swagger-jsdoc
const swaggerDocs = swaggerJSDoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use morgan for logging HTTP requests
app.use(morganMiddleware);

// Middleware for parsing JSON bodies
app.use(express.json()); 

// Use user routes under the '/api' prefix
app.use('/api', userRoutes); // Adjust the route prefix if needed

// Use error handling middleware
app.use(errorHandler);

// app.use(cors({
//   origin: '*',    
//   methods: 'GET,POST,PUT,DELETE',
//   allowedHeaders: 'Content-Type,Authorization',
//   credentials: true,
// }));


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
