// Import necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routes = require('./routes');

// Import initializeDatabase function and pool from your db setup file
const { initializeDatabase } = require('./db-utils/db-setup'); // Adjust the path if needed

// Create the Express app
const app = express();

// Middleware setup
app.use(cors({
    origin: 'https://web2-lab2-frontend-ed5o.onrender.com',
    credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: '740cjdfhasd43248124jklcsdkbwqeqwešaw',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

// Route handling
app.use('/', routes);

// Port setup
const PORT = 5000;

// Function to start the server after initializing the database
const startServer = async () => {
    try {
        // Initialize the database
        await initializeDatabase();
        console.log('Database initialized successfully');

        // Start the server only after database setup is complete
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize the database:', error);
        process.exit(1); // Exit the application if database setup fails
    }
};

// Call startServer to initialize database and start the server
startServer();
