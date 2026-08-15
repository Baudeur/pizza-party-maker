import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type NeverShowAgain = {
  modifyWarning: boolean;
  plusWarning: boolean;
};

type Params = {
  neverShowAgain: NeverShowAgain;
};

export type StoredParams = {
  version: number;
} & Params;

const initialState: Params = {
  neverShowAgain: {
    modifyWarning: false,
    plusWarning: false,
  },
};

const params = createSlice({
  name: "params",
  initialState,
  reducers: {
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
    version: 3,
    neverShowAgain: state.neverShowAgain,
  };
  localStorage.setItem("parameters", JSON.stringify(toStore));
  return state;
}

export const paramsReducer = params.reducer;
export const { setNeverShowAgain } = params.actions;
