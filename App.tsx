import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";

const APP_URL =
  "https://b6860fb4-d640-4d5b-b124-72b9ee4956af-00-40irx84hhv3t.sisko.replit.dev/?nativeBrowserPresentationStyle=fullScreen";

export default function App() {
  const webviewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "android") return;

    const backAction = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webviewRef}
        source={{ uri: APP_URL }}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator
            size="large"
            color="#1BA9C9"
            style={styles.loading}
          />
        )}
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
        }}
        javaScriptEnabled
        domStorageEnabled
        allowsBackForwardNavigationGestures
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
