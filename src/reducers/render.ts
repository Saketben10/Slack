import { createSlice } from "@reduxjs/toolkit";

interface renderState {
  state: string;
  auth: boolean;
  pending: boolean;
}

const initialState: renderState = {
  state: "",
  auth: false,
  pending: false,
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
    pendingStatus: (state, action) => {
      state.pending = action.payload;
    },
  },
});

export const { renderState, authStatus, pendingStatus } = renderSlice.actions;

export default renderSlice.reducer;
