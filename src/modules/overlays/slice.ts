import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NeverShowAgain } from "../params/slice";

export type OverlayId =
  | "PARAM"
  | "SUGGESTER"
  | "INFO"
  | "DETAIL_INFO"
  | "SAVE_PIZZERIA"
  | "MANAGE_PIZZERIA"
  | "DETAILS"
  | "LIGHT_ABOUT"
  | "LIGHT_WARNING"
  | undefined;

type WarningConfirmOverlayProps = {
  confirmAction: () => void;
  confirmLabel: string;
  confirmTitle: string;
  message: string;
  neverShowAgainKey: keyof NeverShowAgain;
};

type OverlayProps = WarningConfirmOverlayProps | undefined;

type OverlaysState = {
  openedOverlay: OverlayId;
  overlayProps: OverlayProps;
  tooltipContent: string | undefined;
  tooltipCoordinates: {
    x: number;
    top: number;
    bottom: number;
  };
};

const initialState: OverlaysState = {
  openedOverlay: undefined,
  overlayProps: undefined,
  tooltipContent: undefined,
  tooltipCoordinates: { x: 0, top: 0, bottom: 0 },
};

const overlays = createSlice({
  name: "overlays",
  initialState,
  reducers: {
    closeOverlay(state) {
      return { ...state, openedOverlay: undefined };
    },
    openOverlay(
      state,
      action: PayloadAction<{ id: OverlayId; props?: OverlayProps }>
    ) {
      return {
        ...state,
        openedOverlay: action.payload.id,
        overlayProps: action.payload.props,
      };
    },
    closeTooltip(state) {
      return { ...state, tooltipContent: undefined };
    },
    openTooltip(
      state,
      action: PayloadAction<{
        content: string;
        coords: { x: number; top: number; bottom: number };
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
