//cSpell:Ignore usuario
import React, { useState, useEffect } from 'react'
import styled from 'styled-components/native'
import {Ionicons} from '@expo/vector-icons'

const TabArea = styled.View`
height: 60px;
background-color: #4EADBE;
flex-direction: row;
`
const TabItem = styled.TouchableOpacity`
flex: 1;
justify-content: center;
align-items: center;
`

export default ({state, navigation}) => {

    const navigateTo = (screenName) => {
        navigation.navigate(screenName)
    }
    
    return(
        <TabArea>
            <TabItem onPress={() => navigateTo('Compras') }>
                <Ionicons name="md-wallet" size={24} color="#FFF"/>
            </TabItem>
            <TabItem onPress={() => navigateTo('Pedidos') }>
                <Ionicons name="md-bookmark" size={24} color="#FFF"/>
            </TabItem>
            <TabItem onPress={() => navigateTo('Relatorio') }>
                <Ionicons name="md-clipboard" size={32} color="#FFF"/>
            </TabItem>
        </TabArea>
    )
}