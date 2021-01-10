import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import AuthProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#312e38" barStyle="light-content" />
      <AuthProvider>
        <View style={{flex: 1}}>
          <Routes />
        </View>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
