import React from "react";
import { View } from "react-native";

const Spacing = ({ size }: { size: number }) => {
  return (
    <View
      style={{
        width: "100%",
        height: size,
        backgroundColor: "transparent",
      }}
    />
  );
};

export default Spacing;
