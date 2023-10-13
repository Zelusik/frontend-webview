import { createSlice } from "@reduxjs/toolkit";
import {
  FoodType,
  PlaceType,
  ReviewType,
  TransformedImageDataType,
} from "../../../types/review";

const initialState: ReviewType = {
  reviewId: 0,
  placeId: 0,
  placeInfo: {
    kakaoPid: "",
    name: "",
    pageUrl: "",
    categoryName: "",
    categoryGroupCode: "",
    phone: "",
    lotNumberAddress: "",
    roadAddress: "",
    lat: "",
    lng: "",
  },
  foodInfo: [],
  keywords: [],
  autoCreatedContent: "",
  content: "",
  images: [],
};

export const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    initializeReviewInfo: () => initialState,
    changeReviewInfo: (
      state,
      {
        payload,
      }: {
        payload: {
          type: string;
          value:
            | number
            | string
            | string[]
            | PlaceType
            | FoodType[]
            | TransformedImageDataType[];
        };
      }
    ) => {
      const { type, value } = payload;
      state[type] = value;
    },
  },
});

export const { initializeReviewInfo, changeReviewInfo } = reviewSlice.actions;

export default reviewSlice.reducer;
