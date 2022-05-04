import { combineReducers } from "redux";
import { connectRouter } from 'connected-react-router';
import coordinates from './coordinates';
import weather from './weather';

import history from "../../history";

export default combineReducers({
    router: connectRouter(history),
    coordinates,
    weather,
});