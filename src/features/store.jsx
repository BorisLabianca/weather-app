import { configureStore } from "@reduxjs/toolkit";
import coordsReducer from "./coords/coordsSlice";
import forecastReducer from "./forecast/forecastSlice";

const store = configureStore({
  reducer: {
    coords: coordsReducer,
    forecast: forecastReducer,
  },
});

export default store;
