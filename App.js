import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/Login';
import BottomTab from './src/routers/BottomTabs';
// import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

GoogleSignin.configure({
  webClientId:
    '565042929187-20tqghg55oqdcgohpfmiqdf7cm6akcnb.apps.googleusercontent.com',
});

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login Screen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login Screen" component={LoginScreen} />
        <Stack.Screen name="Main" component={BottomTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// export default function App() {
//   const [isLogin, setIsLogin] = useState();
//   auth().onAuthStateChanged(user => {
//     if (user) {
//       setIsLogin(true);
//     } else {
//       setIsLogin(false);
//     }
//   });
//   if (isLogin === true) {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Main"
//           screenOptions={{headerShown: false}}>
//           <Stack.Screen name="Login Screen" component={LoginScreen} />
//           <Stack.Screen name="Main" component={BottomTab} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   } else {
//     return (
//       <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Login Screen"
//           screenOptions={{headerShown: false}}>
//           <Stack.Screen name="Login Screen" component={LoginScreen} />
//           <Stack.Screen name="Main" component={BottomTab} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     );
//   }
// }
