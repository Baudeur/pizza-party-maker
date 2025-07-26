import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NeverShowAgain = {
  modifyWarning: boolean;
  plusWarning: boolean;
};

export type Params = {
  slices: number;
  thresholds: {
    okay: number;
    bad: number;
  };
  neverShowAgain: NeverShowAgain;
};

export type StoredParams = {
  version: number;
} & Params;

const initialState: Params = {
  slices: 8,
  thresholds: {
    okay: 125,
    bad: 150,
  },
  neverShowAgain: {
    modifyWarning: false,
    plusWarning: false,
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
    setNeverShowAgain(state, action: PayloadAction<Partial<NeverShowAgain>>) {
      return storeState({
        ...state,
        neverShowAgain: {
          modifyWarning:
            action.payload.modifyWarning ?? state.neverShowAgain.modifyWarning,
          plusWarning:
            action.payload.plusWarning ?? state.neverShowAgain.plusWarning,
        },
      });
    },
  },
});

function storeState(state: Params) {
  const toStore: StoredParams = {
    version: 2,
    slices: state.slices,
    thresholds: state.thresholds,
    neverShowAgain: state.neverShowAgain,
  };
  localStorage.setItem("parameters", JSON.stringify(toStore));
  return state;
}

export const paramsReducer = params.reducer;
export const {
  setSlices,
  setOkayThresholds,
  setBadThresholds,
  setNeverShowAgain,
} = params.actions;
