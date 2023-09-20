const express = require('express');
const morgan = require("morgan");

const router = require('./server/routes/router');
const connectDB = require('./server/database/db');
require("dotenv").config();

connectDB(process.env.MONGODB_URI + "/" + process.env.DB_NAME)
const app = express();

app
    .use(morgan('dev'))
    .use(express.json())
    .use('/api', router)

app.listen(process.env.PORT, process.env.HOST, () => console.log(` [+] SERVER RUNING http://${process.env.HOST}:${process.env.PORT}`))