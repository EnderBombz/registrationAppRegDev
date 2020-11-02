import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import Feed from './../screens/Feed'
import User from './../screens/User'

const Tab = createMaterialBottomTabNavigator()

export default () => {
    return (

        <Tab.Navigator initialRouteName="Compras"
            barStyle={
                { backgroundColor: '#5B377D' }}
            activeColor="#f0edf6"
            inactiveColor="#969696"
            screenOptions={
                ({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Feed') {
                            iconName = focused ? 'bars' : 'bars';
                        } else if (route.name === 'User') {
                            iconName = focused ? 'user' : 'user';
                        } 
                      
                        return <AntDesign name={iconName}size={24}color={color}/>;
                    },
                })
            }>
            <Tab.Screen name="Feed" component={Feed}/> 
            <Tab.Screen name="User"component={User}/>
            
        </Tab.Navigator>

    );
}