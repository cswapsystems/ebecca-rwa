import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface MintState {
  mintJobId: string | null;
}

const initialState: MintState = {
  mintJobId: null,
};

export const mintSlice = createSlice({
  name: "mint",
  initialState,
  reducers: {
    updateMintJobId: (state, action: PayloadAction<string | null>) => {
      state.mintJobId = action.payload;
    },
  },
});

export type MintActions = typeof mintSlice.actions;

export const { updateMintJobId } = mintSlice.actions;

export default mintSlice.reducer;
