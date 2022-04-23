import { combineReducers } from "redux";
import coordinates from './coordinates';
import weather from './weather';

export default combineReducers({
    coordinates,
    weather,
});