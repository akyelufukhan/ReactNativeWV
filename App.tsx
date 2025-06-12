import React, { useRef, useState, useEffect } from 'react';
import { BackHandler, Alert, Platform, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  const webViewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      } else {
        Alert.alert(
          'Cunda Mezze',
          'Uygulamadan çıkmak istiyor musunuz?',
          [
            { text: 'Hayır', style: 'cancel' },
            { text: 'Evet', onPress: () => BackHandler.exitApp() },
          ]
        );
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ uri: 'https://cundamezze.com' }}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CB1F04', // Notch alanına uygun arka plan
    paddingTop: Platform.OS === 'android' ? 5 : 0, // Android notch çözümü
  },
});
