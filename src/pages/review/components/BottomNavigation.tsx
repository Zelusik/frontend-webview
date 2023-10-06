import React from "react";
import { StyleSheet, View, Platform, Image, Text } from "react-native";
import { bottomRoutes } from "../../../constants/bottomRoutes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../../constants/colors";
import { useDispatch } from "react-redux";
import { setReviewModal } from "../../../reducer/slices/review/reviewModalSlice";

const BottomNavigation = ({}) => {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(setReviewModal(false));
  };
  return (
    <View style={styles.container}>
      {bottomRoutes.map((data, idx) => (
        <View key={idx}>
          <TouchableOpacity
            onPress={() => {
              if (data.name === "Review") {
              } else {
                handleCloseModal();
              }
            }}
          >
            <View style={styles.iconContainer}>
              <Image
                source={data.name === "Review" ? data.act : data.none}
                style={styles.bottomImg}
              />
              <Text
                style={[
                  styles.labelText,
                  data.name === "Review"
                    ? styles.labelTextFocused
                    : styles.labelTextUnfocused,
                ]}
              >
                {data.title}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    position: "absolute",
    bottom: 0,

    width: "100%",
    height: 88,
    paddingHorizontal: 30,
    backgroundColor: "#fff",

    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -0.96 },
        shadowOpacity: 0.1,
        shadowRadius: 7.68,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  iconContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
  },
  bottomImg: {
    width: 24,
    height: 24,
  },
  labelText: {
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 24,
  },
  labelTextFocused: {
    color: colors.Orange500,
  },
  labelTextUnfocused: {
    color: colors.N100,
  },
});
