/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Dimensions} from 'react-native';
import { Platform, PermissionsAndroid } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Callout} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

export default function HomeScreen() {
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 3.5578063,
    longitude: 98.649291,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [isGranted, setGrantedPermission] = useState(true)

  useEffect(() => {
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,{
                    'title': 'Location Access Required',
                    'message': 'This App needs to Access your location'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //To Check, If Permission is granted
                setGrantedPermission(true)
                Geolocation.getCurrentPosition(
                  position => {
                  const {latitude, longitude} = position.coords;
                  setCurrentPosition({
                    ...currentPosition,
                    latitude,
                    longitude
                  });
                  })
            } else {
                alert("Permission Denied");
            }
        } catch (err) {
                alert("err",err);
        }
    }
    requestLocationPermission();
}, )

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={currentPosition}
        showsUserLocation>
        {/* <Marker
          onPress={() => alert('marker Hit')}
          coordinate={{
            latitude: LATITUDE + SPACE,
            longitude: LONGITUDE + SPACE,
          }}
          title="Test Title"
          description="This is the test description">
          <Callout tooltip>
            <View>
              <View style={styles.bubble}>
                <Text>Favourite Restaurant</Text>
              </View>
              <View style={styles.arrowBorder} />
              <View style={styles.arrow} />
            </View>
          </Callout>
        </Marker> */}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    width: 140,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#4da2ab',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    borderColor: '#007a87',
    borderWidth: 0.5,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#4da2ab',
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderWidth: 16,
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    alignSelf: 'center',
    marginTop: -0.5,
  },
});
