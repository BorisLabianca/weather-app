import { configureStore } from "@reduxjs/toolkit";
import coordsReducer from "./coords/coordsSlice";
import forecastReducer from "./forecast/forecastSlice";
import localizationReducer from "./localization/localizationSlice";
import themeReducer from "./theme/themeSlice";

const store = configureStore({
  reducer: {
    coords: coordsReducer,
    forecast: forecastReducer,
    localization: localizationReducer,
    theme: themeReducer,
  },
});

export default store;
