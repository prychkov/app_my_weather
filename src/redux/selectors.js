import { createSelector } from "reselect";

export const coordinatesSelector = (state) => state.coordinates.data;

export const coordinatesLoadingSelector = (state) => state.coordinates.loading;
export const coordinatesLoadedSelector = (state) => state.coordinates.loaded;
export const coordinatesErrorSelector = (state) => state.coordinates.error;