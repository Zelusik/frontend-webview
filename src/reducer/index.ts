import { PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import reviewModalSlice from "./slices/review/reviewModalSlice";
import imageSlice from "./slices/image/imageSlice";

const rootReducer = (state: any, action: PayloadAction<any>) => {
  const combineReducer = combineReducers({
    reviewModal: reviewModalSlice,
    image: imageSlice,
  });

  return combineReducer(state, action);
};

export default rootReducer;
