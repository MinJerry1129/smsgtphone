/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Contact from './Contacts/contact';
import Status from './Status/status';

const Stack = createStackNavigator();

const Home = ({route}) => {
    const { champignId } = route.params;
    return (
      <Stack.Navigator>
        <Stack.Screen name="Contact" component={Contact} options={{headerShown: false}} initialParams={{ champignId: champignId }}/>
        <Stack.Screen name="Status" component={Status} options={{headerShown: false}}/>
      </Stack.Navigator>
  );
}
export default Home;
