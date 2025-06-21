/**
 * @format
 */

import React from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import RoutesLogin from './src/routes/RoutesLogin';
import RoutesMain from './src/routes/RoutesMain';
import {useAppDispatch, useAppSelector} from './src/redux/hooks';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  const theme = extendTheme({
    colors: {
      brand: {
        primary: '#0F101E',
        secondary: '#E2E2E2',
        tertiary: '#C219ED',
        accent: '#1594DB',
        textOff: '#656997',
      },
    },
  });

  const getUserProfileSuccess = useAppSelector(
    state => state.user.getUserProfileSuccess,
  );

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: '#0F101E'}}>
      <NativeBaseProvider theme={theme}>
        {!getUserProfileSuccess && <RoutesLogin />}
        {getUserProfileSuccess && <RoutesMain />}
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}

export default App;
