import { createSlice } from "@reduxjs/toolkit";
import { ImageType } from "../../../types/image";

// 이미지를 보여줄 path, 위도 경도 등을 저장할 slice
const initialState: ImageType[] | ImageType = [];

export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    initializeImageInfo: () => initialState,
    changeImageInfo: (state, { payload }: { payload: ImageType[] | ImageType }) => {
      return payload;
    },
  },
});

export const { initializeImageInfo, changeImageInfo } = imageSlice.actions;

export default imageSlice.reducer;
