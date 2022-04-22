import {LOAD_COORDINATES, REQUEST, SUCCESS, FAILURE} from '../constants';

const initialState = {
	loading: false,
	loaded: false,
	coordinates: null,
	error: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
	const {type, data, error} = action;

	switch(type) {
		case LOAD_COORDINATES + REQUEST:
			return {
				...state,
				loading: true,
				error: null,
			};
		case LOAD_COORDINATES + SUCCESS:
			return {
				...state,
				coordinates: data,
				loading: false,
				loaded: true,
				error: null,
			};
		case LOAD_COORDINATES + FAILURE:
			return {
				...state,
				loading: false,
				loaded: false,
				error,
			};
		default: 
			return state;
	}
};