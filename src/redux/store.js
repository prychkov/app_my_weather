import {applyMiddleware, createStore} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import api from './middleware/api';
import reducer from './reducer';

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(api)),
);

export default store;