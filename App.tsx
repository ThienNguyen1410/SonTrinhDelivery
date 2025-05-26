import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {LocaleContextProvider} from '@component/language/LocaleContext';
import {LogBox, ViewStyle} from 'react-native';
import {StoreProvider} from 'easy-peasy';
import {store} from '@store/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppNavigator} from '@navigation/AppNavigator';
import Loading from '@component/loading';

const App = () => {
  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const ROOT: ViewStyle = {
    flex: 1,
  };

  useEffect(() => {
    FontAwesome.loadFont().catch(err => console.log(err));
    Feather.loadFont().catch(err => console.log(err));
    MaterialCommunityIcons.loadFont().catch(err => console.log(err));
    MaterialIcons.loadFont().catch(err => console.log(err));
  });

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
