import React, { useEffect } from 'react';
import {
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Header from '../../components/Header';
import { colors } from '../../constants/colors';
import TabNavigation from './components/BottomNavigation';
import { fontStyle } from '../../constants/commonStyle';
import { useDispatch } from 'react-redux';
import {
  changeImageInfo,
  initializeImageInfo,
} from '../../reducer/slices/image/imageSlice';
import { ExifData } from '../../types/image';
import { changeModalVisible } from '../../reducer/slices/review/reviewModalSlice';
import useToast from '../../hooks/useToast';
import Toast from '../../components/Toast';
import Gallery from '../../components/assets/icons/Gallery';
import { initializeReviewInfo } from '../../reducer/slices/review/reviewSlice';
import ImageResizer from '@bam.tech/react-native-image-resizer';
import RNFS from 'react-native-fs';
import Exif from 'react-native-exif';

const Review = () => {
  const dispatch = useDispatch();
  const { isShowToast, openToast, closeToast } = useToast();

  const handleClickNext = () => {
    dispatch(
      changeModalVisible({
        type: 'reviewMain',
        value: false,
      })
    );
    dispatch(
      changeModalVisible({
        type: 'selectPlace',
        value: true,
      })
    );
  };

  async function hasAndroidPermission() {
    const getCheckPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return Promise.all([
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
          PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
        ]).then(
          ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
            hasReadMediaImagesPermission && hasReadMediaVideoPermission
        );
      } else {
        return PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
      }
    };

    const hasPermission = await getCheckPermissionPromise();
    if (hasPermission) {
      return true;
    }
    const getRequestPermissionPromise = () => {
      if (Number(Platform.Version) >= 33) {
        return PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ]).then(
          (statuses) =>
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
              PermissionsAndroid.RESULTS.GRANTED &&
            statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
              PermissionsAndroid.RESULTS.GRANTED
        );
      } else {
        return PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        ).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
      }
    };

    return await getRequestPermissionPromise();
  }
  // const hasAndroidPermission = async () => {
  //   const permission =
  //     Number(Platform.Version) >= 23
  //       ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
  //       : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;
  //   const hasPermission = await PermissionsAndroid.check(permission);

  //   if (hasPermission) {
  //     return true;
  //   }

  //   const status = await PermissionsAndroid.request(permission);
  //   return status === 'granted';
  // };

  const resizedImage = async (image: any) => {
    let imagePath = image.path;
    if (image.size >= 3145728) {
      const ratio = Math.ceil(Math.sqrt(image.size / 3145728));
      const width = image.width / ratio;
      const height = image.height / ratio;
      await ImageResizer.createResizedImage(
        imagePath,
        width,
        height,
        'JPEG',
        95,
        0
      ).then((res) => (imagePath = res.path));
    }
    const url = await RNFS.readFile(imagePath, 'base64');
    return url;
  };

  const getPhotos = async () => {
    try {
      const images = await ImagePicker.openPicker({
        mediaType: 'photo',
        multiple: true,
        includeExif: true,
        maxFiles: 9,
        writeTempFile: false,
      });
      if (images.length > 9) {
        openToast();
        return;
      }
      const promises = images.map(async (image) => {
        // ios는 sourceURL, aos는 path (AOS 안됨)
        if (Platform.OS === 'ios') {
          Exif.getLatLong(image.sourceURL)
            .then(({ latitude, longitude }: any) => {
              console.log('OK: ' + latitude + ', ' + longitude);
            })
            .catch((msg: any) => console.log('ERROR: ' + msg));
        } else {
          Exif.getLatLong(image.path)
            .then(({ latitude, longitude }: any) => {
              console.log('OK: ' + latitude + ', ' + longitude);
            })
            .catch((msg: any) => console.log('ERROR: ' + msg));
        }

        const url = await resizedImage(image);
        const latitude =
          Platform.OS === 'ios'
            ? (image.exif as ExifData)?.['{GPS}']?.['Latitude'] || ''
            : (image.exif as ExifData)?.['Latitude'] || '';
        const longitude =
          Platform.OS === 'ios'
            ? (image.exif as ExifData)?.['{GPS}']?.['Longitude'] || ''
            : (image.exif as ExifData)?.['Longitude'] || '';

        return {
          image: `data:${image.mime};base64,${url}`,
          imageUrl: `data:${image.mime};base64,${url}`,
          lat: latitude,
          lng: longitude,
        };
      });

      const imageInfoArray = await Promise.all(promises);

      dispatch(changeImageInfo(imageInfoArray));
      handleClickNext();
    } catch (error: any) {
      if (error.message === 'User cancelled image selection') {
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
        return;
      }
    })();
    dispatch(initializeImageInfo());
    dispatch(initializeReviewInfo());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header text="리뷰 쓰기" />
      <View style={styles.mainWrapper}>
        <Text style={fontStyle.Headline5}>
          리뷰 작성을 위해 {'\n'}사진을 선택해주세요!
        </Text>
      </View>
      <TouchableOpacity style={styles.customButton} onPress={getPhotos}>
        <Gallery />
        <Text style={fontStyle.Headline2}>사진 추가하기</Text>
      </TouchableOpacity>
      <TabNavigation />
      {isShowToast && (
        <Toast message={'최대 9장의 사진 선택이 가능합니다'} close={closeToast} />
      )}
    </SafeAreaView>
  );
};

export default Review;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    padding: 20,
  },
  customButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 11,

    width: 160,
    height: 114,
    marginHorizontal: 20,

    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.N40,
  },
});
