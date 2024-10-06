import { createSlice } from "@reduxjs/toolkit";

interface renderState {
  state: string;
  auth: boolean;
}

const initialState: renderState = {
  state: "",
  auth: false,
};

const renderSlice = createSlice({
  name: "render",
  initialState,
  reducers: {
    renderState: (state, action) => {
      state.state = action.payload;
    },

    authStatus: (state, action) => {
      state.auth = action.payload;
    },
  },
});

export const { renderState, authStatus } = renderSlice.actions;

export default renderSlice.reducer;
