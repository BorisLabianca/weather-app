import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "fr",
  fahrenheit: false,
};

const localizationSlice = createSlice({
  name: "localization",
  initialState: initialState,
  reducers: {
    switchLanguage: (state) => {
      if (state.language === "fr") state.language = "en";
      else state.language = "fr";
    },
    switchUnits: (state) => {
      if (state.fahrenheit === false) state.fahrenheit = true;
      else state.fahrenheit = false;
    },
  },
});

export const { switchLanguage, switchUnits } = localizationSlice.actions;
export default localizationSlice.reducer;
