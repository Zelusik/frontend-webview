import React, { useRef } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

function App(): JSX.Element {
  const url = "https://frontend-web-lyart.vercel.app";
  // 웹뷰와 rn과의 소통은 아래의 ref 값을 이용하여 이루어집니다.
  let webviewRef = useRef<any>(null);

  /** 웹뷰 ref */
  const handleSetRef = (_ref: any) => {
    webviewRef = _ref;
  };

  /** 웹뷰에서 rn으로 값을 보낼때 거치는 함수 */
  const handleOnMessage = ({ nativeEvent: { data } }: any) => {
    // data에 웹뷰에서 보낸 값이 들어옵니다.
    console.log(data);
  };

  /** webview 로딩 완료시 */
  const handleEndLoading = (e: any) => {
    console.log("handleEndLoading");
    /** rn에서 웹뷰로 정보를 보내는 메소드 */
    // webviewRef.postMessage("로딩 완료시 webview로 정보를 보내는 곳");
  };

  return (
    <SafeAreaView style={globalStyle.container}>
      <WebView
        ref={handleSetRef}
        onLoadEnd={handleEndLoading}
        onMessage={handleOnMessage}
        source={{ uri: url }}
      />
    </SafeAreaView>
  );
}

const globalStyle = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

export default App;
