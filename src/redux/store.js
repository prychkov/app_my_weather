import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import api from './middleware/api';
import reducer from './reducer';

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk, api)),
);

export default store;