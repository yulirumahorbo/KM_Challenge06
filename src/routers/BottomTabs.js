/* eslint-disable prettier/prettier */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Colors from '../constans/Colors';
import HomeScreen from '../screens/Home';
import QRCode from '../screens/QRCode';
import {moderateScale} from 'react-native-size-matters';

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const RenderIcon = ({name, focused}) => {
    return (
      <AntDesign
        name={name}
        color={focused ? Colors.teal : Colors.black}
        size={moderateScale(30)}
      />
    );
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          height: moderateScale(44),
          paddingVertical: moderateScale(4),
        },
      }}>
      <Tab.Screen
        name="Home Screen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <RenderIcon name="home" focused={focused} />
          ),
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="QR Code Screen"
        component={QRCode}
        options={{
          tabBarIcon: ({focused}) => (
            <RenderIcon name="qrcode" focused={focused} />
          ),
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}