import {REQUEST, SUCCESS, FAILURE} from '../constants';

// eslint-disable-next-line import/no-anonymous-default-export
export default (store) => (next) => async (action) => {
	if (!action.CallAPI) return next(action);

	const {CallAPI, type, ...rest} = action;

	next({...rest, type: type + REQUEST});

	try {
		const res = await fetch(CallAPI);
		const data = await res.json();             

		if (!res.ok || data.length === 0) throw data;

		next({...rest, type: type + SUCCESS, data}); 
	} catch(error) {
		throw next({...rest, type: type + FAILURE, error});	
	}
}