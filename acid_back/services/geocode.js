const axios = require('axios');
const Redis = require('ioredis');

const client = new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);
const apiKey = process.env.GOOGLE_MAPS_API_KEY;
const getCountry = async (lat, long) => {
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&sensor=false&key=${apiKey}`;
    const request = await axios.default.get(url);
    const response = request;
    let country = '';
    response.data.results.forEach(result => {
      if (!country && result.types[0] === 'country') {
        country = result.address_components[0].short_name;
      }
    });
    return country;
  } catch (error) {
    return error;
  }
};

const getCountryCoordinates = async (countryCapital, countryName) => {
  try {
    let coordinates;
    await client.get(`${countryCapital}+${countryName}`).then(result => {
      if (result !== null) {
        coordinates = JSON.parse(result);
      }
    });
    if (!coordinates) {
      const capital = encodeURIComponent(countryCapital);
      const country = encodeURIComponent(countryName);

      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${capital}+${country}&key=${apiKey}`;
      const request = await axios.default.get(url);
      const response = request;
      coordinates = response.data.results[0].geometry.location;
      client.set(
        `${countryCapital}+${countryName}`,
        JSON.stringify(response.data.results[0].geometry.location),
        'EX',
        60 * 60 * 24
      );
    }
    return coordinates;
  } catch (error) {
    return error;
  }
};

module.exports = { getCountry, getCountryCoordinates };
