const express = require('express');
const cors = require('cors')
const BCCRRoutes = require('./routes/BCCRRoutes')
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/indicators', BCCRRoutes)
app.listen(process.env.API_PORT, () => {
    console.log('Server up on port: ' + process.env.API_PORT)
})