import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { fontStyle } from "../../constants/commonStyle";
import { colors } from "../../constants/colors";

const BottomButton = ({ text, onPress }: { text: string; onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <Text style={[fontStyle.Headline3, { color: colors.N0 }]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BottomButton;

const styles = StyleSheet.create({
  buttonWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 54,
    borderRadius: 8,
    backgroundColor: colors.Orange600,
  },
});
