import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constants/colors";
import { fontStyle } from "../../constants/commonStyle";
import Wran from "../../components/assets/icons/Warn";

const Toast = ({ message, close }: { message: string; close: () => void }) => {
  const opacity = useSharedValue(0.5);
  const translateY = useSharedValue(-3);

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    });
    translateY.value = withTiming(10, {
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
    });

    setTimeout(() => {
      opacity.value = withTiming(0, {
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
      });
      translateY.value = withTiming(-3, {
        duration: 1000,
        easing: Easing.inOut(Easing.quad),
      });
    }, 3000);

    setTimeout(() => {
      close();
    }, 3000);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.toastWrapper}>
      <Animated.View style={[animatedStyle, styles.toastInner]}>
        <Wran />
        <Text style={[fontStyle.Paragraph5, { color: colors.N0 }]}>{message}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastWrapper: {
    position: "absolute",
    bottom: 120,
    alignSelf: "center",
  },
  toastInner: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignSelf: "center",
    alignItems: "center",
    width: "auto",
    borderRadius: 50,
    backgroundColor: "rgba(32, 35, 48, 0.8)",
    paddingVertical: 13,
    paddingHorizontal: 25,
    zIndex: 3,
    elevation: 3,
  },
});

export default Toast;
