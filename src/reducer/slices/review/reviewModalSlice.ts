import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviewModal: false,
};

export const reviewModalSlice = createSlice({
  name: "reviewModal",
  initialState,
  reducers: {
    initializeReviewModal: () => initialState,
    toggleReviewModal: (state) => {
      state.reviewModal = !state.reviewModal;
    },
    setReviewModal: (state, action) => {
      state.reviewModal = action.payload;
    },
  },
});

export const { initializeReviewModal, toggleReviewModal, setReviewModal } =
  reviewModalSlice.actions;

export default reviewModalSlice.reducer;
