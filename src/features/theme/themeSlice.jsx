import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    switchTheme: (state) => {
      if (state.theme === "light") state.theme = "dark";
      else state.theme = "light";
    },
  },
});

export const { switchTheme } = themeSlice.actions;
export default themeSlice.reducer;
