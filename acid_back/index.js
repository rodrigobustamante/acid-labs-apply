require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { returnWeather } = require('./api');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const { lat, lng } = req.body;
  if (!lat) {
    res.status(400).send({ message: 'Latitude is required!' });
  }
  if (!lng) {
    res.status(400).send({ message: 'Longitude is required!' });
  }
  returnWeather(req, res, lat, lng);
});

app.listen(8000, () => {
  console.log('API RUNNING ON PORT 8000');
});
