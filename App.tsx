import React, { useRef, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  BackHandler,
  Platform,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { WebView } from 'react-native-webview';

const APP_URL =
  'https://b6860fb4-d640-4d5b-b124-72b9ee4956af-00-40irx84hhv3t.sisko.replit.dev/?nativeBrowserPresentationStyle=fullScreen';

export default function App() {
  const webviewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Platform.OS !== 'android') return;

    const backAction = () => {
      if (canGoBack && webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.topBar}>
        <View style={styles.logoWrap}>
          <Text style={styles.logoText}>ص</Text>
        </View>
        <View style={styles.topBarTextWrap}>
          <Text style={styles.headerLabel}>صحتي</Text>
          <Text style={styles.headerSub}>منصة الرعاية الصحية</Text>
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => webviewRef.current?.goBack()}
          disabled={!canGoBack}
        >
          <Text style={[styles.backText, !canGoBack && styles.backTextDisabled]}>رجوع</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#1BA9C9" />
          <Text style={styles.loadingText}>جاري التحميل...</Text>
        </View>
      )}

      <WebView
        ref={webviewRef}
        source={{ uri: APP_URL }}
        style={styles.webview}
        startInLoadingState={false}
        javaScriptEnabled
        domStorageEnabled
        allowsBackForwardNavigationGestures
        onNavigationStateChange={(navState) => {
          setCanGoBack(navState.canGoBack);
        }}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F9FF',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingTop: Platform.OS === 'android' ? 18 : 14,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#E4F0F7',
    elevation: 3,
    shadowColor: '#0C2339',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  logoWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#EAF7FC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1BA9C9',
  },
  topBarTextWrap: {
    flex: 1,
    marginHorizontal: 10,
  },
  headerLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0D2D46',
  },
  headerSub: {
    fontSize: 11,
    color: '#5E7A8E',
    marginTop: 2,
  },
  backButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#F1F7FB',
  },
  backText: {
    color: '#0D2D46',
    fontWeight: '700',
    fontSize: 12,
  },
  backTextDisabled: {
    opacity: 0.4,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F9FF',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 12,
    color: '#1A3C61',
    fontWeight: '700',
    fontSize: 14,
  },
  webview: {
    flex: 1,
    backgroundColor: '#F3F9FF',
  },
});
