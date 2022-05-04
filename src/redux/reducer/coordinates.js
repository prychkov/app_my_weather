import produce from 'immer';
import {LOAD_COORDINATES, REQUEST, SUCCESS, FAILURE} from '../constants';

const initialState = {
	loading: false,
	loaded: false,
	data: null,
	error: null,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => produce(state, (draft) => {
		const {type, data, error} = action;

		switch(type) {
			case LOAD_COORDINATES + REQUEST: {
				draft.loading = true;
				draft.error = null;
				break;
			}
			case LOAD_COORDINATES + SUCCESS: {
				draft.data = data;
				draft.loading = false;
				draft.loaded = true;
				draft.error = null;
				break;
			}
			case LOAD_COORDINATES + FAILURE: {
				draft.loading = false;
				draft.loaded = false;
				draft.error = error;
				draft.data = null;
				break;
			}
			default: 
				return;
		}
	});