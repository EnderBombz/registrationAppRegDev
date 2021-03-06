import React,{useState} from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import MainTab from './MainTab'
import ReservationScreen from './../screens/ReservationScreen'
import ConfigTime from './../screens/ConfigTime'
import SignIn from './../screens/SignIn'
import SignUp from './../screens/SignUp'

const Stack = createStackNavigator()

export default ()=>{


  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn}/>
         <Stack.Screen name="MainTab" component={MainTab}/>
         <Stack.Screen name="ReservationScreen" component={ReservationScreen}/>
         <Stack.Screen name="ConfigTime" component={ConfigTime}/>
         <Stack.Screen name="SignUp" component={SignUp}/>
    </Stack.Navigator>
  );
}
