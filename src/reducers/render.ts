import { createSlice } from "@reduxjs/toolkit";

interface renderState {
  open: boolean;
  pending: boolean;
  auth: boolean;
  render: string;
}

const initialState: renderState = {
  open: false,
  pending: false,
  auth: false,
  render: "",
};

const renderSlice = createSlice({
  name: "render",
  initialState,
  reducers: {
    pendingStatus: (state, action) => {
      state.pending = action.payload;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
    authStatus: (state, action) => {
      state.auth = action.payload;
    },
    renderState: (state, action) => {
      state.render = action.payload;
    },
  },
});

export const { setOpen, pendingStatus, authStatus, renderState } =
  renderSlice.actions;

export default renderSlice.reducer;
