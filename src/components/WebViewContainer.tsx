import React, { useEffect, useRef, useState } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import {
  Alert,
  BackHandler,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { WEBVIEW_URL } from "@env";

export default function WebviewContainer({ navigation, route }: any) {
  const url = route.params?.url ?? WEBVIEW_URL + "/community";
  const [state, setState] = useState({ url: "", canGoBack: false, title: "" });

  let webviewRef = useRef<any>(null);
  const handleSetRef = (_ref: any) => {
    webviewRef = _ref;
  };

  /** rn에서 웹뷰로 정보를 보내는 메소드 */
  const handleRN2Webview = (e: any) => {
    webviewRef?.postMessage("로딩 완료시 webview로 정보를 보내는 곳");
  };

  /** 웹뷰에서 rn으로 값을 보낼때 거치는 함수 */
  const handleWebview2RN = async (e: WebViewMessageEvent): Promise<void> => {
    console.log(e.nativeEvent.data);
  };

  function close() {
    Alert.alert("종료하시겠어요?", "확인을 누르면 종료합니다.", [
      {
        text: "취소",
        onPress: () => {},
        style: "cancel",
      },
      { text: "확인", onPress: () => BackHandler.exitApp() },
    ]);
  }

  const handleBackButton = () => {
    if (state.canGoBack) {
      if (state.url === WEBVIEW_URL + "/") {
        // close();
        BackHandler.exitApp();
      } else {
        webviewRef?.goBack();
      }
    } else {
      //   close();
      BackHandler.exitApp();
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton);
    };
  }, [state.url, state.title]);

  return (
    <SafeAreaView style={globalStyle.container}>
      <WebView
        ref={handleSetRef}
        onLoadEnd={handleRN2Webview}
        onMessage={handleWebview2RN}
        source={{ uri: WEBVIEW_URL }}
        onNavigationStateChange={(navState) => {
          setState({
            url: navState.url,
            canGoBack: navState.canGoBack,
            title: navState.title,
          });
        }}
        scalesPageToFit={Platform.OS === "android"}
        bounces={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceHorizontal={false}
        alwaysBounceVertical={false}
        scrollEnabled={false}
        overScrollMode="never"
      />
    </SafeAreaView>
  );
}

const globalStyle = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  },
});
