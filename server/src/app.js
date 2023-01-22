const express = require('express')
const app = express();
require('./config/database').connect();
const authRoutes = require('./routes/auth.route')
app.use(express.json());

app.use('/api', authRoutes)

module.exports = app;