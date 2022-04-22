import {LOAD_COORDINATES} from './constants';

export const loadCoordinates = (url) => ({
	type: LOAD_COORDINATES,
	CallAPI: url,
});