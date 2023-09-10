import React from "react";
import { BackHandler, SafeAreaView, StyleSheet } from "react-native";
import WebViewContent from "./WebviewContent";

export default function WebviewContainer() {
  return (
    <SafeAreaView style={globalStyle.container}>
      <WebViewContent handleClose={() => BackHandler.exitApp()} />
    </SafeAreaView>
  );
}

const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
