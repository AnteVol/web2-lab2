const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routes = require('./routes');

const { initializeDatabase } = require('./db-utils/db-setup');

const app = express();

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

app.use('/', routes);

const PORT = 5000;

const startServer = async () => {
    try {
        await initializeDatabase();
        console.log('Database initialized successfully');

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to initialize the database:', error);
        process.exit(1);
    }
};

startServer();
