const axios = require('axios');
const Redis = require('ioredis');

const client = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);
const getCountryData = async countryCode => {
  try {
    let countryData;
    await client.get(countryCode).then(result => {
      if (result !== null) {
        countryData = JSON.parse(result);
      }
    });
    if (!countryData) {
      const url = `https://restcountries.eu/rest/v2/alpha/${countryCode}`;
      const request = await axios.default.get(url);
      const response = request;
      countryData = response.data;
      client.set(countryCode, JSON.stringify(countryData), 'EX', 60 * 60 * 24);
    }
    return countryData;
  } catch (error) {
    return error;
  }
};

module.exports = { getCountryData };
