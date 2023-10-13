import React, { useState } from "react";
import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Header from "../../components/Header";
import { colors } from "../../constants/colors";
import { fontStyle } from "../../constants/commonStyle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { changeModalVisible } from "../../reducer/slices/review/reviewModalSlice";
import { ScrollView } from "react-native-gesture-handler";
import Spacing from "../../components/Spacing";
import Chevron from "../../components/assets/icons/Chevron";
import BottomButton from "../../components/BottomButton";
import useGetPlaceInfo from "../../hooks/queries/review/useGetPlaceInfo";

const screenWidth = Dimensions.get("window").width;

const Place = () => {
  const dispatch = useDispatch();
  const image: any = useSelector((state: RootState) => state.image);

  const [currIdx, setCurrIdx] = useState<number>(1);
  const { placeInfo } = useSelector((state: RootState) => state.review);
  const { isLoading } = useGetPlaceInfo(image);

  const handleClickBack = () => {
    dispatch(
      changeModalVisible({
        type: "selectPlace",
        value: false,
      })
    );
    dispatch(
      changeModalVisible({
        type: "reviewMain",
        value: true,
      })
    );
  };

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = e.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrIdx(index + 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? null : (
        <>
          <Header text="음식점 선택" back={true} onPress={handleClickBack} />
          <View style={styles.mainWrapper}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.scrollView}
              onMomentumScrollEnd={handleScrollEnd}
              pagingEnabled
            >
              <View style={{ flexDirection: "row" }}>
                {image.map((img: any, index: number) => (
                  <Image
                    key={index}
                    source={{ uri: img.image }}
                    style={styles.image}
                  />
                ))}
              </View>
            </ScrollView>
            <View style={styles.imgCntWrapper}>
              <Text
                style={[fontStyle.Paragraph2, { color: colors.N0 }]}
              >{`${currIdx}/${image.length}`}</Text>
            </View>
          </View>
          <Spacing size={10} />
          <View style={styles.placeContainer}>
            <Text style={fontStyle.Headline5}>어느 음식점인가요?</Text>
            <View style={styles.placeInputWrapper}>
              <Text style={fontStyle.Headline3}>{placeInfo.name}</Text>
              <Chevron />
            </View>
          </View>
          <View style={styles.button}>
            <BottomButton text="다음으로" onPress={() => {}} />
            <Spacing size={40} />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Place;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: colors.N0,
  },
  mainWrapper: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  scrollView: {
    alignItems: "center",
  },
  image: {
    width: screenWidth - 40,
    aspectRatio: 1.14,
    borderRadius: 12,
    position: "relative",
    marginHorizontal: 10,
  },
  imgCntWrapper: {
    backgroundColor: "rgba(32, 35, 48, 0.6)",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    position: "absolute",
    right: 35,
    bottom: 35,
  },
  placeContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    paddingHorizontal: 20,
  },
  placeInputWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    height: 54,
    paddingHorizontal: 20,
    paddingVertical: 16,

    borderRadius: 12,
    backgroundColor: colors.N0,
    borderColor: colors.N40,
    borderWidth: 1,
    borderStyle: "solid",
  },

  button: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});
