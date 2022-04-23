import { createSelector } from "reselect";

export const coordinatesSelector = (state) => state.coordinates.data;

export const coordinatesLoadingSelector = (state) => state.coordinates.loading;
export const coordinatesLoadedSelector = (state) => state.coordinates.loaded;
export const coordinatesErrorSelector = (state) => state.coordinates.error;

export const weatherSelector = (state) => state.weather.data;

export const weatherLoadingSelector = (state) => state.weather.loading;
export const weatherLoadedSelector = (state) => state.weather.loaded;
export const weatherErrorSelector = (state) => state.weather.error;

const isoSelector = createSelector(
	[],
	() => require('iso-3166-1')
);

export const countriesSelector = createSelector(
	[isoSelector],
	(iso) => iso.all()
);