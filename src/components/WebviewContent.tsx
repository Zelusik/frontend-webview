import React, { useRef, useState, useEffect } from "react";
import { BackHandler, Modal } from "react-native";
import WebView from "react-native-webview";
import { WEBVIEW_URL } from "@env";
import Review from "../pages/review/Review";
import { useDispatch, useSelector } from "react-redux";
import { setReviewModal } from "../reducer/slices/review/reviewModalSlice";
import { RootState } from "../store";

const WebViewContent = ({ handleClose }: any) => {
  const dispatch = useDispatch();
  const webviewRef = useRef<any>();
  const [isCanGoBack, setIsCanGoBack] = useState(false);
  const { reviewModal } = useSelector((state: RootState) => state.reviewModal);

  const handleCloseModal = () => {
    dispatch(setReviewModal(false));
  };

  const handleMessage = (event: any) => {
    const message = event.nativeEvent.data;
    if (message === "mobile") {
      dispatch(setReviewModal(true));
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
        onMessage={handleMessage}
      />

      <Modal
        transparent={false}
        visible={reviewModal}
        onRequestClose={handleCloseModal}
      >
        <Review onClose={handleClose} />
      </Modal>
    </>
  );
};

export default WebViewContent;
