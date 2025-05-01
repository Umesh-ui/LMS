import {View, Text, StatusBar, SafeAreaView} from 'react-native';
import React from 'react';
import AppNavigator from './src/AppNavigator';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
      <StatusBar backgroundColor={'purple'} />
      <AppNavigator />
    </SafeAreaView>
  );
};

export default App;
