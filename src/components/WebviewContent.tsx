import React, { useRef, useState, useEffect } from "react";
import { BackHandler } from "react-native";
import WebView from "react-native-webview";
import { WEBVIEW_URL } from "@env";

const WebViewContent = ({ handleClose }: any) => {
  const webviewRef = useRef<any>();
  const [isCanGoBack, setIsCanGoBack] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isCanGoBack) {
          webviewRef.current.goBack();
        } else {
          handleClose();
        }
        return true;
      }
    );
    return () => backHandler.remove();
  }, [isCanGoBack, handleClose]);

  useEffect(() => {
    if (webviewRef && webviewRef.current.clearCache) {
      webviewRef.current.clearCache();
    }
  }, [webviewRef]);

  return (
    <WebView
      ref={webviewRef}
      source={{ uri: WEBVIEW_URL }}
      style={{
        backgroundColor: "#ffffff",
      }}
      pullToRefreshEnabled={true}
      startInLoadingState={true}
      allowsBackForwardNavigationGestures={true}
      mixedContentMode={"compatibility"}
      originWhitelist={["https://*", "http://*"]}
      overScrollMode={"never"}
      injectedJavaScript={`
        (function() {
          function wrap(fn) {
            return function wrapper() {
              var res = fn.apply(this, arguments);
              window.ReactNativeWebView.postMessage(window.location.href);
              return res;
            }
          }
          history.pushState = wrap(history.pushState);
          history.replaceState = wrap(history.replaceState);
          window.addEventListener('popstate', function() {
            window.ReactNativeWebView.postMessage(window.location.href);
          });
        })();
        true;
        `}
      // webviewRef.postMessage : RN2Webview
      // Webview2RN
      onMessage={(event) => {
        const url = event.nativeEvent.data;
        console.log(url);
        setIsCanGoBack(url !== WEBVIEW_URL + "/");
      }}
    />
  );
};

export default WebViewContent;
