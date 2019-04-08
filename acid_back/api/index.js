const { getCountry, getCountryCoordinates } = require('./../services/geocode');
const { getCountryData } = require('./../services/country_data');
const { getWeather } = require('./../services/weather');

const returnWeather = async (req, res, lat, lng) => {
  try {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    if (randomNumber === 1) {
      return returnWeather(req, res, lat, lng);
    }
    const countryCode = await getCountry(lat, lng);
    if (!countryCode) {
      return res
        .status(400)
        .send({ message: 'Invalid coordinates, try with others' });
    }
    const countryData = await getCountryData(countryCode);
    const { nativeName, capital } = countryData;
    const coordinates = await getCountryCoordinates(capital, nativeName);
    const weather = await getWeather(coordinates);
    return res.send({
      countryCode,
      country: nativeName,
      capital,
      coordinates,
      weather,
    });
  } catch (error) {
    return res.status(400).send({ error });
  }
};

module.exports = { returnWeather };
