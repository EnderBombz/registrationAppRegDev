import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import MainTab from './MainTab'
import ReservationScreen from './../screens/ReservationScreen'
import ConfigTime from './../screens/ConfigTime'


const Stack = createStackNavigator()

export default ()=>{
  return (
    <Stack.Navigator initialRouteName="MainTab" screenOptions={{ headerShown: false }}>
         <Stack.Screen name="MainTab" component={MainTab}/>
         <Stack.Screen name="ReservationScreen" component={ReservationScreen}/>
         <Stack.Screen name="ConfigTime" component={ConfigTime}/>
    </Stack.Navigator>
  );
}
