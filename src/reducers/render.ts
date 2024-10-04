import { createSlice } from "@reduxjs/toolkit";

interface renderState {
  state: string;
}

const initialState: renderState = {
  state: "",
};

const renderSlice = createSlice({
  name: "render",
  initialState,
  reducers: {
    renderState: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { renderState } = renderSlice.actions;

export default renderSlice.reducer;
