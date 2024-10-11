import { createSlice } from "@reduxjs/toolkit";

interface renderState {
  open: boolean;
}

const initialState: renderState = {
  open: false,
};

const renderSlice = createSlice({
  name: "render",
  initialState,
  reducers: {
    workspaceStatus: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { workspaceStatus } = renderSlice.actions;

export default renderSlice.reducer;
