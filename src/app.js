/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  SafeAreaView,
  PermissionsAndroid
} from 'react-native';

import {request,check, PERMISSIONS, RESULTS} from 'react-native-permissions';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home/home';
import Champign from './Champign/champign';

const Stack = createStackNavigator();

PERMISSIONS.ANDROID.SEND_SMS

function App() {
  useEffect(()=>{
    request(PERMISSIONS.ANDROID.SEND_SMS)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        // …
      });
  })
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  // PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.SEND_SMS);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Champign" component={Champign} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
