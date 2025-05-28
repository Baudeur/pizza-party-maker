import { RootState } from "../../store";

export const openedOverlaySelector = (state: RootState) =>
  state.overlays.openedOverlay;

export const tooltipContentSelector = (state: RootState) =>
  state.overlays.tooltipContent;

export const tooltipCoordsSelector = (state: RootState) =>
  state.overlays.tooltipCoordinates;
