import {LOAD_COORDINATES} from './constants';
import APIkey from '../../APIkey';

export const loadCoordinates = (city) => ({
	type: LOAD_COORDINATES,
	CallAPI: `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`,
});