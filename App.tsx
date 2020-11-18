import * as Permissions from 'expo-permissions';

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [cameraRef, setCameraRef] = useState<Camera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.AUDIO_RECORDING
      );
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null)
    return <View />;
  else if (hasPermission === false)
    return <Text>No access to camera</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={ref => {setCameraRef(ref)}}>
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
      </Camera>
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