const express = require('express');
const cors = require('cors')
const indicatorRoutes = require('./routes/indicatorRoutes')
const indexRoutes = require('./routes/indexRoutes')
require('dotenv').config();

// API config.
const app = express();
app.use(cors());
app.use(express.json());

// Main routes.
app.use('/index', indexRoutes)
app.use('/indicator', indicatorRoutes)
app.use('/curve', indicatorRoutes)

app.listen(process.env.API_PORT, () => {
    console.log('Server up on port: ' + process.env.API_PORT)
})