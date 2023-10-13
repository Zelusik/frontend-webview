import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { changeReviewInfo } from "../../../reducer/slices/review/reviewSlice";
import { kakaoSearchKeyword } from "../../../apis/open-api";
import { useQuery } from "react-query";
import Geolocation from "react-native-geolocation-service";
import { PermissionsAndroid, Platform } from "react-native";

// 리뷰 작성 시 처음에 장소 위치 알아오기 위해 사용
const useGetPlaceInfo = (image: any) => {
  const dispatch = useDispatch();
  const { placeInfo } = useSelector((state: RootState) => state.review);

  const requestLocationPermission = async () => {
    let granted = null;

    if (Platform.OS === "android") {
      const hasPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (!hasPermission) {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "'eatery'이(가) 사용자의 위치를 사용하도록 허용하겠습니까?",
            message: "사진 리뷰 등록을 위해 접근 권한을 허용해주세요.",
            buttonNeutral: "나중에 다시 묻기",
            buttonNegative: "허용 안 함",
            buttonPositive: "앱을 사용하는 동안 허용",
          }
        );
      } else {
        granted = PermissionsAndroid.RESULTS.GRANTED;
      }
    } else {
      granted = await Geolocation.requestAuthorization("always");
    }

    if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === "granted") {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            resolve({ lat, lng });
          },
          (error) => {
            reject(error);
          }
        );
      });
    } else {
      const lat = 37.544018;
      const lng = 126.951592;
      return { lat, lng };
    }
  };

  const dispatchPlaceInfo = (res: any) => {
    dispatch(
      changeReviewInfo({
        type: "placeInfo",
        value: {
          kakaoPid: res.documents[0].id,
          name: res.documents[0].place_name,
          pageUrl: res.documents[0].place_url,
          categoryName: res.documents[0].category_name,
          categoryGroupCode: res.documents[0].category_group_code,
          phone: res.documents[0].phone,
          lotNumberAddress: res.documents[0].address_name,
          roadAddress: res.documents[0].raod_address_name,
          lat: res.documents[0].y,
          lng: res.documents[0].x,
        },
      })
    );
  };

  const getKakaoData = async (lng: any, lat: any) => {
    if (!lng || !lat) {
      const { lat: currLat, lng: currLng }: any = await requestLocationPermission();
      console.log(currLat, currLng);
      const res = await kakaoSearchKeyword({
        x: currLng,
        y: currLat,
        keyword: "",
        page: 1,
      });
      dispatchPlaceInfo(res);
    } else {
      const res = await kakaoSearchKeyword({
        x: lng,
        y: lat,
        keyword: "",
        page: 1,
      });
      dispatchPlaceInfo(res);
    }
  };

  const { data, isLoading, error } = useQuery(
    ["kakaoData", image[0]?.lng, image[0]?.lat],
    async () => await getKakaoData(image[0]?.lng, image[0]?.lat),
    {
      // retry: false,
      // enabled: !placeInfo.kakaoPid && image.length > 0,
    }
  );
  return { data, isLoading, error };
};

export default useGetPlaceInfo;
