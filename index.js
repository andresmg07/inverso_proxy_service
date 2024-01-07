const express = require('express');
const cors = require('cors')
const indicatorRoutes = require('./routes/indicatorRoutes')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/indicator', indicatorRoutes)
app.use('/curve', indicatorRoutes)
app.use('/index', indicatorRoutes)
app.listen(process.env.API_PORT, () => {
    console.log('Server up on port: ' + process.env.API_PORT)
})