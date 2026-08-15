import { RootState } from "../../store";

export const neverShowAgainSelector = (state: RootState) =>
  state.params.neverShowAgain;
