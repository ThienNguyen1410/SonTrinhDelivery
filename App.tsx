import React from 'react';

import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {LocaleContextProvider} from './app/components/language/LocaleContext';
import {LogBox, ViewStyle} from 'react-native';
import {StoreProvider} from 'easy-peasy';
import {store} from './app/state/store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppNavigator} from './app/navigation/AppNavigator';
import Loading from './app/components/loading';

const App = () => {
  LogBox.ignoreAllLogs();
  Feather.loadFont().then;
  MaterialCommunityIcons.loadFont().then;
  const ROOT: ViewStyle = {
    flex: 1,
  };

  return (
    <GestureHandlerRootView style={ROOT}>
      <StoreProvider store={store}>
        <Loading>
          <LocaleContextProvider>
            <AppNavigator />
          </LocaleContextProvider>
        </Loading>
      </StoreProvider>
    </GestureHandlerRootView>
  );
};

export default App;
