import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from '@redux-devtools/extension';
import api from './middleware/api';
import reducer from './reducer';
import history from '../history';

const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history), api)),
);

export default store;