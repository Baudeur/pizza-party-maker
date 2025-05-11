import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Params = {
  slices: number;
  thresholds: {
    okay: number;
    bad: number;
  };
};

export type StoredParams = {
  version: number;
  slices: number;
  thresholds: {
    okay: number;
    bad: number;
  };
};

const initialState: Params = {
  slices: 8,
  thresholds: {
    okay: 125,
    bad: 150,
  },
};

const params = createSlice({
  name: "params",
  initialState,
  reducers: {
    setSlices(state, action: PayloadAction<number>) {
      return storeState({ ...state, slices: action.payload });
    },
    setOkayThresholds(state, action: PayloadAction<number>) {
      return storeState({
        ...state,
        thresholds: { ...state.thresholds, okay: action.payload },
      });
    },
    setBadThresholds(state, action: PayloadAction<number>) {
      return storeState({
        ...state,
        thresholds: { ...state.thresholds, bad: action.payload },
      });
    },
  },
});

function storeState(state: Params) {
  const toStore: StoredParams = {
    version: 1,
    slices: state.slices,
    thresholds: state.thresholds,
  };
  localStorage.setItem("parameters", JSON.stringify(toStore));
  return state;
}

export const paramsReducer = params.reducer;
export const { setSlices, setOkayThresholds, setBadThresholds } =
  params.actions;
