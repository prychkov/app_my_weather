import { replace } from 'connected-react-router';
import {LOAD_COORDINATES, LOAD_WEATHER, REQUEST, SUCCESS, FAILURE} from './constants';
import APIkey from '../APIkey';

export const loadCoordinates = (city) => async (dispatch) => {
	dispatch({type: LOAD_COORDINATES + REQUEST, city });

	try {
		const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${APIkey}`);
		const data = await res.json();             

		if (!res.ok || data.length === 0) throw data;

		dispatch({type: LOAD_COORDINATES + SUCCESS, city, data}); 
	} catch(error) {
		dispatch({type: LOAD_COORDINATES + FAILURE, city, error});
		dispatch(replace('/error'));
	}
};

export const loadWeather = (coordinates) => async (dispatch) => {
	const lat = coordinates.map((item) => item.lat);
	const lon = coordinates.map((item) => item.lon);

	dispatch({type: LOAD_WEATHER + REQUEST, coordinates});

	try {
		const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`);
		const data = await res.json();             

		if (!res.ok) throw data;

		dispatch({type: LOAD_WEATHER + SUCCESS, coordinates, data}); 
	} catch(error) {
		dispatch({type: LOAD_WEATHER + FAILURE, coordinates, error});
		dispatch(replace('/error'));
	}
};