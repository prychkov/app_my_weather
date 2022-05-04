import {LOAD_WEATHER, REQUEST, SUCCESS, FAILURE} from '../constants';

const initialState = {
	loading: false,
	loaded: false,
	data: null,
	error: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	const {type, data, error} = action;

	switch(type) {
		case LOAD_WEATHER + REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case LOAD_WEATHER + SUCCESS:
			return {
				...state,
				data,
				loading: false,
				loaded: true,
				error: null,
			};
		case LOAD_WEATHER + FAILURE:
			return {
				data: null,
				loading: false,
				loaded: false,
				error,
			};
		default:
			return state;
	}
}