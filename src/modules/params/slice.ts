import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Params = {
  slices: number;
  okayThreshold: number;
  badThreshold: number;
};

const initialState = {
  slices: 8,
  okayThreshold: 1.25,
  badThreshold: 1.5,
};

const params = createSlice({
  name: "params",
  initialState,
  reducers: {
    setSlices(state, action: PayloadAction<number>) {
      return { ...state, slices: action.payload };
    },
    setOkayThresholds(state, action: PayloadAction<number>) {
      return {
        ...state,
        okayThreshold: action.payload,
      };
    },
    setBadThresholds(state, action: PayloadAction<number>) {
      return {
        ...state,
        badThreshold: action.payload,
      };
    },
  },
});

export const paramsReducer = params.reducer;
export const { setSlices, setOkayThresholds, setBadThresholds } =
  params.actions;
