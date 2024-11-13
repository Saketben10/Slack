import { createSlice } from "@reduxjs/toolkit";

interface renderState {
  open: boolean;
  pending: boolean;
  auth: boolean;
  render: string;
  toggle: boolean;
}

const initialState: renderState = {
  open: false,
  pending: false,
  auth: false,
  render: "",
  toggle: false,
};

const renderSlice = createSlice({
  name: "render",
  initialState,
  reducers: {
    pendingStatus: (state, action) => {
      state.pending = action.payload;
      console.log(action.type);
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
    toggleState: (state) => {
      state.toggle = !state.toggle;
    },
  },
});

export const { setOpen, pendingStatus, authStatus, renderState, toggleState } =
  renderSlice.actions;

export default renderSlice.reducer;
