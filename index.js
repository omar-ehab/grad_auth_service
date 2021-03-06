const express = require('express')
const bodyParser = require('body-parser');
const helmet = require('helmet');
const createError = require('http-errors')
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');

const PORT = process.env.PORT || 80;

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.json());


//auth routes
app.use('/auth', authRoutes);


//404 error
app.use(async (req, res, next) => {
    next(createError.NotFound());
});

//other errors handler
app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
        status: err.status || 500,
        message: err.message,
        }
    });
});

app.listen(PORT, () => {
    console.log(`app started on http://127.0.0.1:${PORT}`)
});