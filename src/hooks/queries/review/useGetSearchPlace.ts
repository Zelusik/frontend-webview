import React from "react";
import { useInfiniteQuery } from "react-query";
import { kakaoSearchKeyword } from "../../../apis/open-api";

const useGetSearchPlace = ({ x, y, keyword }: any) => {
  const {
    data: responseData,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["searchPlace", x, y, keyword],
    async ({ pageParam = 1 }) => {
      return await kakaoSearchKeyword({
        x: x,
        y: y,
        keyword: keyword,
        page: pageParam,
      });
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.meta.is_end ? undefined : allPages.length + 1;
      },
    }
  );
  const data = responseData?.pages;
  return { data, fetchNextPage, hasNextPage };
};

export default useGetSearchPlace;
