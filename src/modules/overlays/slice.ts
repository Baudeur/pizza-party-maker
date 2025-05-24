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

const initialState: { opened: OverlayId } = {
  opened: undefined,
};

const overlays = createSlice({
  name: "overlays",
  initialState,
  reducers: {
    closeOverlay(state) {
      return { ...state, opened: undefined };
    },
    openOverlay(state, action: PayloadAction<OverlayId>) {
      return { ...state, opened: action.payload };
    },
  },
});

export const overlaysReducer = overlays.reducer;
export const { closeOverlay, openOverlay } = overlays.actions;
