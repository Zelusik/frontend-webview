import { PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import reviewModalSlice from "./slices/review/reviewModalSlice";
import imageSlice from "./slices/image/imageSlice";
import reviewSlice from "./slices/review/reviewSlice";

const rootReducer = (state: any, action: PayloadAction<any>) => {
  const combineReducer = combineReducers({
    reviewModal: reviewModalSlice,
    image: imageSlice,
    review: reviewSlice,
  });

  return combineReducer(state, action);
};

export default rootReducer;
