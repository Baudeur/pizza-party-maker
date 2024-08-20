import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Params = {
  slices: number;
};

const initialState = {
  slices: 8,
};

const params = createSlice({
  name: "params",
  initialState,
  reducers: {
    setSlices(state, action: PayloadAction<number>) {
      state.slices = action.payload;
    },
  },
});

export const paramsReducer = params.reducer;
export const { setSlices } = params.actions;
