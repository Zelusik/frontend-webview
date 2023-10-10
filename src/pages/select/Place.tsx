import React, { useRef, useState } from "react";
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

const screenWidth = Dimensions.get("window").width;

const Place = () => {
  const dispatch = useDispatch();
  const image: any = useSelector((state: RootState) => state.image);
  const [currIdx, setCurrIdx] = useState<number>(1);

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
              <Image key={index} source={{ uri: img.image }} style={styles.image} />
            ))}
          </View>
        </ScrollView>
        <View style={styles.imgCntWrapper}>
          <Text
            style={[fontStyle.Paragraph2, { color: colors.N0 }]}
          >{`${currIdx}/${image.length}`}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Place;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
});
