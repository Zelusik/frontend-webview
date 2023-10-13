import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { changeModalVisible } from "../../reducer/slices/review/reviewModalSlice";
import Header from "../../components/Header";
import SearchInput from "./components/SearchInput";
import { RootState } from "../../store";
import useGetSearchPlace from "../../hooks/queries/review/useGetSearchPlace";
import { fontStyle } from "../../constants/commonStyle";
import { changeReviewInfo } from "../../reducer/slices/review/reviewSlice";

const SearchPlace = () => {
  const dispatch = useDispatch();
  const { placeInfo } = useSelector((state: RootState) => state.review);

  const [searchText, setSearchText] = useState("");

  const { data, hasNextPage, fetchNextPage } = useGetSearchPlace({
    x: searchText ? 0 : placeInfo.lng,
    y: searchText ? 0 : placeInfo.lat,
    keyword: searchText,
  });

  const handleClickBack = () => {
    dispatch(
      changeModalVisible({
        type: "searchPlace",
        value: false,
      })
    );
    dispatch(
      changeModalVisible({
        type: "selectPlace",
        value: true,
      })
    );
  };

  const handleClickPlace = (place: any) => {
    dispatch(
      changeReviewInfo({
        type: "placeInfo",
        value: {
          kakaoPid: place.id,
          name: place.place_name,
          pageUrl: place.place_url,
          categoryName: place.category_name,
          categoryGroupCode: place.category_group_code,
          phone: place.phone,
          lotNumberAddress: place.address_name,
          roadAddress: place.raod_address_name,
          lat: place.y,
          lng: place.x,
        },
      })
    );
    handleClickBack();
  };
  const placeInfoBtn = ({ item: place }: any) => (
    <TouchableOpacity
      style={styles.placeInfo}
      onPress={() => handleClickPlace(place)}
    >
      <Text style={[fontStyle.Headline3]}>{place.place_name}</Text>
      <Text
        style={[fontStyle.Paragraph3, { color: colors.N60, marginLeft: -3 }]}
      >{`${
        place.category_name.split(">")[place.category_name.split(">").length - 1]
      }  · ${place.address_name.split(" ").slice(0, 3).join(" ")} `}</Text>
    </TouchableOpacity>
  );

  const loadMoreItems = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topWrapper}>
        <Header text="" back={true} onPress={handleClickBack} />
        <SearchInput searchText={searchText} setSearchText={setSearchText} />
      </View>

      <FlatList
        data={data?.flatMap((place_data) => place_data.documents)}
        renderItem={placeInfoBtn}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={loadMoreItems}
        onEndReachedThreshold={0.1}
        style={styles.mainWrapper}
      />
    </SafeAreaView>
  );
};

export default SearchPlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.N0,
  },
  topWrapper: {
    marginBottom: 20,
  },
  mainWrapper: {
    paddingHorizontal: 20,
  },
  placeInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 4,

    marginBottom: 26,
  },
});
