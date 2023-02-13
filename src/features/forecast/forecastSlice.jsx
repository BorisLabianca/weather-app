import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoading: true, forecast: null };

const forecastSlice = createSlice({
  name: "forecast",
  initialState: initialState,
  reducers: {
    switchIsloading: (state, action) => {
      const { payload } = action;
      state.isLoading = payload;
    },
    addForecastInfo: (state, action) => {
      const { payload } = action;
      state.forecast = payload;
    },
  },
});
export const { addForecastInfo, switchIsloading } = forecastSlice.actions;
export default forecastSlice.reducer;
