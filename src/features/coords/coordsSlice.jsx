import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  locationLoading: true,
  coords: "",
};

const coordsSlice = createSlice({
  name: "coords",
  initialState: initialState,
  reducers: {
    switchLocationLoading: (state, action) => {
      const { payload } = action;
      state.locationLoading = payload;
    },
    addCoords: (state, action) => {
      const { payload } = action;
      //   console.log(payload);
      state.coords = payload;
    },
  },
});
export const { addCoords, switchLocationLoading } = coordsSlice.actions;
export default coordsSlice.reducer;
