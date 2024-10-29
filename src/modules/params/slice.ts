import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Params = {
  slices: number;
  thresholds: {
    okay: number;
    bad: number;
  };
};

const initialState: Params = {
  slices: 8,
  thresholds: {
    okay: 1.25,
    bad: 1.5,
  },
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
        thresholds: { ...state.thresholds, okay: action.payload },
      };
    },
    setBadThresholds(state, action: PayloadAction<number>) {
      return {
        ...state,
        thresholds: { ...state.thresholds, bad: action.payload },
      };
    },
  },
});

export const paramsReducer = params.reducer;
export const { setSlices, setOkayThresholds, setBadThresholds } =
  params.actions;
