import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SalasReservadasProvider } from './src/contexts/firebase'
import MainStack from './src/stack/MainStack'

export default () => {
  return (
    <SalasReservadasProvider>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </SalasReservadasProvider>
  )
}