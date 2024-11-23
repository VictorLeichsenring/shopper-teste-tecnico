const cors = require('cors');
const express = require('express');
require('dotenv').config();



const {
  DriverRoutes,
  GoogleRoutes,
} = require('./routes')

const app = express();
app.use(express.json());

app.get('/', (_req, res) => res.status(200).json({message: 'olá mundo!!'}))
app.use('/drivers', DriverRoutes)
app.use('/routes', GoogleRoutes)

app.use(cors());



module.exports = app;