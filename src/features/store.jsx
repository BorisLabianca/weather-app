import { configureStore } from "@reduxjs/toolkit";
import coordsReducer from "./coords/coordsSlice";
import forecastReducer from "./forecast/forecastSlice";
import localizationReducer from "./localization/localizationSlice";

const store = configureStore({
  reducer: {
    coords: coordsReducer,
    forecast: forecastReducer,
    localization: localizationReducer,
  },
});

export default store;
