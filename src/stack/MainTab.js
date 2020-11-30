import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { AntDesign } from '@expo/vector-icons';

import Feed from './../screens/Feed'
import User from './../screens/User'
import Solicitacoes from './../screens/Requests'

import { connect } from 'react-redux'


const Tab = createMaterialBottomTabNavigator()

const MainTab = ({email}) => {

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
                        console.log(email)
                        if (email != 'admin') {
                            if (route.name === 'Feed') {
                                iconName = focused ? 'bars' : 'bars';
                            } else if (route.name === 'User') {
                                iconName = focused ? 'user' : 'user';
                            }
                        } else {
                            if (route.name === "Solicitacoes") {
                                iconName = focused ? 'eye' : 'eye';
                            } else if (route.name === 'User') {
                                iconName = focused ? 'user' : 'user';
                            }else if(route.name === 'Feed'){
                                iconName = focused ? 'bars' : 'bars';
                            }
                        }


                        return <AntDesign name={iconName} size={24} color={color} />;
                    },
                })
            }>
            <Tab.Screen name="Feed" component={Feed} />
            {email == 'admin'? <Tab.Screen name="Solicitacoes" component={Solicitacoes}/>:null}
            <Tab.Screen name="User" component={User} />

        </Tab.Navigator>

    );
}
export default connect(state => ({
    email: state.user.email,
    nome: state.user.nome,
}))(MainTab)