import {
  GET_WEATHER_REQUEST,
  GET_WEATHER_RESPONSE,
  GET_WEATHER_FAILURE
} from "./actions";

const elementsInitialState = {
  isLoading: false,
  error: false,
  weather: {
    lat: -33.447487,
    lng: -70.673676,
    country: undefined,
    capital: undefined,
    temperature: undefined,
    humidity: undefined,
    windSpeed: undefined,
    uvIndex: undefined,
    precipProbability: undefined,
    icon: undefined
  }
};

// State
export const weather = (state = elementsInitialState, action) => {
  switch (action.type) {
    case GET_WEATHER_REQUEST:
      return {
        ...state,
        ...(state.weather.lat = action.lat),
        ...(state.weather.lng = action.lng),
        ...(state.weather.temperature = undefined),
        ...(state.weather.country = undefined),
        ...(state.weather.capital = undefined),
        ...(state.weather.humidity = undefined),
        ...(state.weather.windSpeed = undefined),
        ...(state.weather.uvIndex = undefined),
        ...(state.weather.precipProbability = undefined),
        ...(state.weather.time = undefined),
        ...(state.weather.icon = undefined),
        ...(state.weather.coordinates = undefined),
        isLoading: action.isLoading,
        error: false
      };
    case GET_WEATHER_RESPONSE:
      return {
        ...state,
        isLoading: false,
        error: false,
        ...(state.weather.temperature = action.temperature),
        ...(state.weather.country = action.country),
        ...(state.weather.capital = action.capital),
        ...(state.weather.humidity = action.humidity),
        ...(state.weather.windSpeed = action.windSpeed),
        ...(state.weather.uvIndex = action.uvIndex),
        ...(state.weather.precipProbability = action.precipProbability),
        ...(state.weather.icon = action.icon),
        ...(state.weather.time = action.time),
        ...(state.weather.coordinates = action.coordinates),
        ...(state.weather.lat = action.lat),
        ...(state.weather.lng = action.lng)
      };

    case GET_WEATHER_FAILURE:
      return {
        ...state,
        ...(state.weather.temperature = undefined),
        ...(state.weather.country = undefined),
        ...(state.weather.capital = undefined),
        ...(state.weather.humidity = undefined),
        ...(state.weather.windSpeed = undefined),
        ...(state.weather.uvIndex = undefined),
        ...(state.weather.precipProbability = undefined),
        ...(state.weather.time = undefined),
        ...(state.weather.icon = undefined),
        ...(state.weather.coordinates = undefined),
        isLoading: false,
        error: true
      };

    default:
      return state;
  }
};
