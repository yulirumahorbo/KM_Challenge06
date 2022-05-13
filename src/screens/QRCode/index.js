/* eslint-disable prettier/prettier */
import React from 'react'
import {CameraScreen, CameraType} from 'react-native-camera-kit';
import { useIsFocused } from '@react-navigation/native';

export default function QRCode() {
  const isFocused = useIsFocused();
  const onReadCode = data => {
    alert(data.nativeEvent.codeStringValue);
  };
  return (
    isFocused ?
    <CameraScreen
      cameraType= {CameraType.Back}
      scanBarcode={true}
      onReadCode={(event) => onReadCode(event)}
      showFrame={true} 
      laserColor='red' 
      frameColor='white'
    />
 : null
  )
}
