import axios from "axios";

export const GET_WEATHER_REQUEST = "WEATHER/GET_WEATHER_REQUEST";
export const GET_WEATHER_RESPONSE = "WEATHER/GET_WEATHER_RESPONSE";
export const GET_WEATHER_FAILURE = "WEATHER/GET_WEATHER_FAILURE";

const API_URL = process.env.REACT_APP_API_URL;

export function getWeather(lat, lng, isLoading = true) {
  return async dispatch => {
    dispatch({
      type: GET_WEATHER_REQUEST,
      lat,
      lng,
      isLoading
    });
    try {
      const request = axios.post(API_URL, { lat, lng });
      const response = await request;
      const { country, capital, weather, coordinates } = response.data;
      const {
        temperature,
        icon,
        humidity,
        windSpeed,
        uvIndex,
        precipProbability,
        time
      } = weather;
      return dispatch({
        type: GET_WEATHER_RESPONSE,
        lat,
        lng,
        country,
        capital,
        temperature,
        humidity,
        windSpeed,
        uvIndex,
        precipProbability,
        icon,
        time,
        coordinates
      });
    } catch (error) {
      return dispatch({
        type: GET_WEATHER_FAILURE,
        error: true
      });
    }
  };
}
