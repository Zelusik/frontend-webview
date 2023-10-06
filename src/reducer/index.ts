import { PayloadAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import reviewModalSlice from "./slices/review/reviewModalSlice";

const rootReducer = (state: any, action: PayloadAction<any>) => {
  const combineReducer = combineReducers({
    reviewModal: reviewModalSlice,
  });

  return combineReducer(state, action);
};

export default rootReducer;
