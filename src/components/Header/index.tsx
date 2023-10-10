import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { fontStyle } from "../../constants/commonStyle";
import Arrow from "../assets/icons/Arrow";

const Header = ({
  text,
  back,
  onPress,
}: {
  text: string;
  back?: boolean;
  onPress?: any;
}) => {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        {back && (
          <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
            <Arrow />
          </TouchableOpacity>
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
