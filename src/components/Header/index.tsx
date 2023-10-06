import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import Arrow from "../assets/images/arrow.jpg";
import { fontStyle } from "../../constants/commonStyle";

const Header = ({ text, back }: { text: string; back?: boolean }) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {back && (
          <View style={styles.iconContainer}>
            <Image source={Arrow} style={styles.icon} />
          </View>
        )}
        <View style={[styles.textContainer, back && { marginRight: 24 }]}>
          <Text style={fontStyle.Headline3}>{text}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {},
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {},
});

export default Header;
