import { RootState } from "../../store";

export const openedOverlaySelector = (state: RootState) =>
  state.overlays.opened;
