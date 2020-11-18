import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { RNCamera } from 'react-native-camera';

export default function App() {
  const [cameraRef, setCameraRef] = useState<RNCamera | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      <RNCamera style={styles.camera} type={RNCamera.Constants.Type.back} ref={ref => {setCameraRef(ref)}}>
        <View
          style={styles.cameraContainer}>
          <TouchableOpacity
            onPressIn={async() => {
              if (cameraRef)
              {
                let video = await cameraRef.recordAsync();
                console.log(video);
              }
            }}
            onPressOut={() => {
              if (cameraRef)
                cameraRef.stopRecording();
            }}
            style={styles.button}
          />
        </View>
      </RNCamera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    marginBottom: 30,
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    height: 50,
    width: 50,
    borderRadius: 50,
  }
});