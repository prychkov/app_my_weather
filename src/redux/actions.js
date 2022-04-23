import {LOAD_COORDINATES, LOAD_WEATHER} from './constants';
import APIkey from '../APIkey';

export const loadCoordinates = (city) => ({
	type: LOAD_COORDINATES,
	CallAPI: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`,
	city,
});

export const loadWeather = (coordinates) => {
	const lat = coordinates.map((item) => item.lat);
	const lon = coordinates.map((item) => item.lon);
	return {
	type: LOAD_WEATHER,
	CallAPI: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`,
	lat,
	lon,
	};
};