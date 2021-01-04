import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#312e38" barStyle="light-content" />
      <Routes />
    </NavigationContainer>
  );
};

export default App;
