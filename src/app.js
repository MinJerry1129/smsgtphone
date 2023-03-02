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

import Home from './Home/home';

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
function App() {

  return (
    <SafeAreaView>
      <Home/>
    </SafeAreaView>
  );
}

export default App;
