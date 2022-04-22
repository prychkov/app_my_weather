import {createStore} from 'redux';
import coordinates from './reducer';

const store = createStore(coordinates);

export default store;