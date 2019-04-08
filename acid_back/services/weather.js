const axios = require('axios');
const Redis = require('ioredis');

const client = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);
const apiKey = process.env.DARKSKY_API_KEY;
const getWeather = async coordinates => {
  try {
    let weather;
    await client.get(`${coordinates.lat},${coordinates.lng}`).then(result => {
      if (result !== null) {
        weather = JSON.parse(result);
      }
    });
    if (!weather) {
      const url = `https://api.darksky.net/forecast/${apiKey}/${
        coordinates.lat
      },${coordinates.lng}?units=si`;
      const request = await axios.default.get(url);
      const response = request;
      weather = response.data.currently;
      client.set(
        `${coordinates.lat},${coordinates.lng}`,
        JSON.stringify(response.data.currently),
        'EX',
        60 * 5
      );
    }
    return weather;
  } catch (error) {
    return error;
  }
};

module.exports = { getWeather };
