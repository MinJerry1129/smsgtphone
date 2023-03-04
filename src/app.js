/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  PermissionsAndroid
} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home/home';
import Champign from './Champign/champign';

const Stack = createStackNavigator();

function App() {
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.SEND_SMS);
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
