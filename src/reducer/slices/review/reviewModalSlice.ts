import { createSlice } from "@reduxjs/toolkit";

const initialState: ModalType = {
  reviewMain: false,
  selectPlace: false,
  searchPlace: false,
};

export const reviewModalSlice = createSlice({
  name: "reviewModal",
  initialState,
  reducers: {
    initializeReviewModal: () => initialState,
    changeModalVisible: (state, action) => {
      const { type, value } = action.payload;
      state[type] = value;
    },
  },
});

export const { initializeReviewModal, changeModalVisible } =
  reviewModalSlice.actions;

export default reviewModalSlice.reducer;
