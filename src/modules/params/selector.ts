import { RootState } from "../../store";

export const sliceSelector = (state: RootState) => state.params.slices;

export const thresholdsSelector = (state: RootState) => state.params.thresholds;

export const okayThresoldsSelector = (state: RootState) =>
  state.params.thresholds.okay;

export const badThresoldsSelector = (state: RootState) =>
  state.params.thresholds.bad;
