import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type OverlayId =
  | "PARAM"
  | "SUGGESTER"
  | "INFO"
  | "DETAIL_INFO"
  | "SAVE_PIZZERIA"
  | "MANAGE_PIZZERIA"
  | "DETAILS"
  | undefined;

type OverlaysState = {
  openedOverlay: OverlayId;
  tooltipContent: string | undefined;
  tooltipCoordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

const initialState: OverlaysState = {
  openedOverlay: undefined,
  tooltipContent: undefined,
  tooltipCoordinates: { x: 0, y: 0, width: 0, height: 0 },
};

const overlays = createSlice({
  name: "overlays",
  initialState,
  reducers: {
    closeOverlay(state) {
      return { ...state, openedOverlay: undefined };
    },
    openOverlay(state, action: PayloadAction<OverlayId>) {
      return { ...state, openedOverlay: action.payload };
    },
    closeTooltip(state) {
      return { ...state, tooltipContent: undefined };
    },
    openTooltip(
      state,
      action: PayloadAction<{
        content: string;
        coords: { x: number; y: number; width: number; height: number };
      }>
    ) {
      return {
        ...state,
        tooltipContent: action.payload.content,
        tooltipCoordinates: action.payload.coords,
      };
    },
  },
});

export const overlaysReducer = overlays.reducer;
export const { closeOverlay, openOverlay, openTooltip, closeTooltip } =
  overlays.actions;
