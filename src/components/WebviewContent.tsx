import React, { useRef, useState, useEffect } from "react";
import { BackHandler } from "react-native";
import WebView from "react-native-webview";
import { WEBVIEW_URL } from "@env";
import Review from "../pages/review/Review";

const WebViewContent = ({ handleClose }: any) => {
  const webviewRef = useRef<any>();
  const [isCanGoBack, setIsCanGoBack] = useState(false);
  const [showWebView, setShowWebView] = useState(true);

  const handleMessage = (event: any) => {
    const message = event.nativeEvent.data;
    if (message === "mobile") {
      setShowWebView(false);
    } else {
      setIsCanGoBack(message !== WEBVIEW_URL + "/");
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      if (isCanGoBack) {
        webviewRef.current.goBack();
      } else {
        handleClose();
      }
      return true;
    });
    return () => backHandler.remove();
  }, [isCanGoBack, handleClose]);

  useEffect(() => {
    if (webviewRef && webviewRef.current.clearCache) {
      webviewRef.current.clearCache();
    }
  }, [webviewRef]);

  return (
    <>
      {showWebView ? (
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
          originWhitelist={["https://*", "http://*", "*"]}
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
          onMessage={handleMessage}
        />
      ) : (
        <Review />
      )}
    </>
  );
};

export default WebViewContent;
