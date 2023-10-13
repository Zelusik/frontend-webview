import axios from "axios";
import { KAKAO_REST_API_KEY } from "@env";

export const kakaoSearchKeyword = async ({ x, y, keyword, page }: any) => {
  return await axios
    .get(`https://dapi.kakao.com/v2/local/search/keyword.json`, {
      headers: {
        Authorization: `KakaoAK ${KAKAO_REST_API_KEY}`,
      },
      params: {
        page: page,
        query: keyword || "음식점",
        category_group_code: "FD6,CE7",
        size: 15,
        sort: "distance",
        x: x !== null && x !== undefined ? x : undefined,
        y: y !== null && y !== undefined ? y : undefined,
        radius: 1000,
      },
    })
    .then(({ data }) => data)
    .catch((err) => err.response);
};
