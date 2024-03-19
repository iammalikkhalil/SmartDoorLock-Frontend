import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from './src/screens/Dashboard';
import socketServcies from './src/utils/SocketService';
// import LoginUser from './src/screens/LoginUser';
// import OTP from './src/screens/OTP';
// import OtpVerify from './src/screens/OtpVerify';
// import RegisterUser from './src/screens/RegisterUser';




const Stack = createNativeStackNavigator();

export default function App() {

  useEffect(() => {
    socketServcies.initializeSocket();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        {/* <Stack.Screen name="LoginUser" component={LoginUser} /> */}
        {/* <Stack.Screen name="OTP" component={OTP} /> */}
        {/* <Stack.Screen name="OtpVerify" component={OtpVerify} /> */}
        {/* <Stack.Screen name="RegisterUser" component={RegisterUser} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}