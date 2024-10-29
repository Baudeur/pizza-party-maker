import { RootState } from "../../store";

export const sliceSelector = (state: RootState) => state.params.slices;

export const okayThresoldsSelector = (state: RootState) =>
  state.params.okayThreshold;

export const badThresoldsSelector = (state: RootState) =>
  state.params.badThreshold;
