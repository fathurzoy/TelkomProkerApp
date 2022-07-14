import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import {Provider, useSelector} from 'react-redux';
import {Loading} from './components/molecules';
import store from './redux/store';
import Router from './router';
import {Provider as PaperProvider} from 'react-native-paper';

const MainApp = () => {
  const {isLoading} = useSelector(state => state.globalReducer);
  return (
    <NavigationContainer>
      <Router />
      <FlashMessage position="top" />
      {isLoading && <Loading />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PaperProvider>
          <MainApp />
        </PaperProvider>
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
