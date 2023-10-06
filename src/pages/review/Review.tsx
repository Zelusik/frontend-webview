import React, { useEffect } from "react";
import {
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import Header from "../../components/Header";
import { colors } from "../../constants/colors";
import Gallery from "../../components/assets/images/gallery.jpg";
import TabNavigation from "./components/BottomNavigation";

const Review = ({ onClose }: any) => {
  const hasAndroidPermission = async () => {
    const permission =
      Number(Platform.Version) >= 33
        ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
        : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  };

  const getPhotos = async () => {
    ImagePicker.openPicker({
      multiple: true,
      includeExif: true,
    }).then((images: any) => {
      console.log(images[0].exif);
    });
  };

  // useEffect(() => {
  //   (async () => {
  //     if (Platform.OS === "android" && !(await hasAndroidPermission())) {
  //       return;
  //     }
  //      getPhotos();
  //   })();
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header text="리뷰 쓰기" />
      <View style={styles.mainWrapper}>
        <Text style={styles.text}>리뷰 작성을 위해 {"\n"}사진을 선택해주세요!</Text>
      </View>
      <TouchableOpacity style={styles.customButton} onPress={getPhotos}>
        <Image source={Gallery} />
        <Text style={styles.customText}>사진 추가하기</Text>
      </TouchableOpacity>
      <TabNavigation />
    </SafeAreaView>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mainWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: 20,
  },
  text: {
    fontSize: 20,
    color: colors.N100,
    lineHeight: 28,
    fontWeight: "700",
  },
  customButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 11,

    width: 160,
    height: 114,
    marginHorizontal: 20,

    borderRadius: 12,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.N40,
  },
  customText: {
    fontSize: 14,
    color: colors.N100,
    lineHeight: 19.6,
    fontWeight: "700",
  },
});
