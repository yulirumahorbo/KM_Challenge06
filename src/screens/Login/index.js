/* eslint-disable prettier/prettier */
import React, { useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {Button, Surface, TextInput, Text} from 'react-native-paper';
import axios from 'axios';
import {BaseUrl} from '../../helpers/api';
import Colors from '../../constans/Colors';
import {moderateScale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TouchID from 'react-native-touch-id';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const doLogin = async () => {
    try {
      const dataLogin = {
        email: email,
        password: password,
      };
      const results = await axios.post(
        `${BaseUrl}api/v1/auth/login`,
        dataLogin,
      );
      if (results.status === 201 || results.status === 200) {
        navigation.navigate('Main');
      }
    } catch (error) {
      Alert.alert('Gagal', 'Isi username dan password Anda');
    }
  };

  const optionalConfigObject = {
    title: 'Login',
    color: '#e00606',
  };

  const pressHandler = () => {
    TouchID.authenticate(
      'Put your finger on the fingerprint sensor.',
      optionalConfigObject,
    )
      .then(success => {
        Alert.alert('Authenticated Successfully');
        navigation.navigate('Main');
      })
      .catch(error => {
        Alert.alert('Authentication Failed');
      });
  };

  const googleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      navigation.navigate('Main');
    } catch (error) {
      console.log(error);
    }
  };

  // const googleLogin = async () => {
  //   const {idToken} = await GoogleSignin.signIn();
  //   const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  //   await auth().signInWithCredential(googleCredential)
  //     .then(user => {
  //       console.log(user.additionalUserInfo);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chapter 6</Text>
      <Surface style={styles.box}>
        <View>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            activeOutlineColor="#999"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            label="Password"
            mode="outlined"
            style={{
              marginTop: moderateScale(8),
              borderRadius: moderateScale(16),
            }}
            value={password}
            activeOutlineColor="#999"
            onChangeText={text => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            mode="contained"
            color={Colors.red}
            labelStyle={{fontSize: moderateScale(16), color: Colors.white}}
            style={{
              marginTop: moderateScale(16),
              borderRadius: moderateScale(16),
              fontSize: moderateScale(16),
              alignSelf: 'center',
              paddingVertical: moderateScale(5),
              paddingHorizontal: moderateScale(60),
              marginRight: moderateScale(5)
            }}
            onPress={doLogin}>
            Login
          </Button>
          <Button
            onPress={() => pressHandler()}
            mode="contained"
            color={Colors.red}
            style={{
              marginTop: moderateScale(16),
              borderRadius: moderateScale(16),
            }}>
            <MaterialIcons
              name="fingerprint"
              size={moderateScale(30)}
              color={'#333'}
            />
          </Button>
        </View>

        <TouchableOpacity
          style={{alignItems: 'flex-end', paddingVertical: moderateScale(8)}}>
          <Text style={styles.regularSubText}>Forgot Password?</Text>
        </TouchableOpacity>
        <Text style={[styles.regularText, {textAlign: 'center'}]}>
          or login with
        </Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View>
            <Button
              style={{
                marginTop: moderateScale(16),
                borderRadius: moderateScale(20),
              }}
              onPress={googleLogin}
              >
              <AntDesign
                name="google"
                size={moderateScale(30)}
                color={'#333'}
              />
            </Button>
            <Text style={[styles.regularSubText, {textAlign: 'center'}]}>
              Google
            </Text>
          </View>
          {/* <View>
            <Button
              style={{
                marginTop: moderateScale(16),
                borderRadius: moderateScale(20),
              }}>
              <FontAwesome
                name="facebook"
                size={moderateScale(30)}
                color={'#333'}
              />
            </Button>
            <Text style={[styles.regularSubText, {textAlign: 'center'}]}>
              Facebook
            </Text>
          </View> */}
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: moderateScale(28),
    backgroundColor: Colors.teal,
  },
  box: {
    borderRadius: moderateScale(16),
    elevation: moderateScale(16),
    padding: moderateScale(20),
    height: moderateScale(400),
  },
  title: {
    fontSize: moderateScale(40),
    textAlign: 'center',
    color: Colors.orange,
    marginBottom: moderateScale(20),
    fontWeight: 'bold',
  },
  regularText: {
    fontWeight: '500',
    fontSize: moderateScale(16),
    color: '#000000',
  },
  regularSubText: {
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: '#000000',
  },
});
