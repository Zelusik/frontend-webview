import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { colors } from "../../../constants/colors";
import Search from "../../../components/assets/icons/Search";
import { fontStyle } from "../../../constants/commonStyle";
import X_Button from "../../../components/assets/icons/X_Button";

const SearchInput = ({ searchText, setSearchText }: any) => {
  const handleChangeSearchText = (e: any) => {
    setSearchText(e.nativeEvent.text);
  };
  return (
    <View style={styles.container}>
      <Search />
      <TextInput
        value={searchText}
        onChange={handleChangeSearchText}
        placeholder="리뷰를 쓸 음식점을 검색해보세요."
        style={[
          styles.input,
          searchText ? fontStyle.Paragraph6 : fontStyle.Paragraph4,
        ]}
        placeholderTextColor={colors.N50}
      />
      {searchText ? (
        <TouchableOpacity style={styles.x_button} onPress={() => setSearchText("")}>
          <X_Button />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,

    height: 50,
    paddingHorizontal: 12,
    marginHorizontal: 20,

    backgroundColor: colors.N0,
    borderColor: colors.N40,
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 12,
  },
  input: {
    flex: 1,
  },
  x_button: {
    display: "flex",
    alignItems: "flex-end",
  },
});
