import { RootState } from "../../store";

export const openedOverlaySelector = (state: RootState) =>
  state.overlays.openedOverlay;

export const overlayPropsSelector = (state: RootState) =>
  state.overlays.overlayProps;

export const tooltipContentSelector = (state: RootState) =>
  state.overlays.tooltipContent;

export const tooltipCoordsSelector = (state: RootState) =>
  state.overlays.tooltipCoordinates;
