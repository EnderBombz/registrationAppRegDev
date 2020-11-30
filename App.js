import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { SalasReservadasProvider } from './src/contexts/firebase'
import MainStack from './src/stack/MainStack'
import { Provider } from 'react-redux';

import store from './src/store';

export default () => {
  return (
    <Provider store={store}>
      <SalasReservadasProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </SalasReservadasProvider>
    </Provider>

  )
}