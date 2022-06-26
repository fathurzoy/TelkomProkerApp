import {
  Button,
  DrawerLayoutAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../components/molecules/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {getData} from '../../utils';

const Dashboard = () => {
  const [username, setUsername] = useState();

  const drawer = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    getData('username').then(res => {
      setUsername(res.value);
    });
  }, [username]);

  const signOut = () => {
    AsyncStorage.multiRemove(['username', 'token_tel']).then(() => {
      navigation.reset({index: 0, routes: [{name: 'SignIn'}]});
    });
  };

  const navigationView = () => (
    <View style={[styles.container, styles.navigationContainer]}>
      <Button title="Home" onPress={() => drawer.current.closeDrawer()} />
      <Button title="Proker" onPress={() => drawer.current.closeDrawer()} />
      <Button title="Staff" onPress={() => drawer.current.closeDrawer()} />
      <Button title="Setting" onPress={() => drawer.current.closeDrawer()} />
      <Button title="Logout" onPress={signOut} />
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={navigationView}>
      <View style={styles.container}>
        <Header title={username} onPress={() => drawer.current.openDrawer()} />
        <Text>Dashboard</Text>
      </View>
    </DrawerLayoutAndroid>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigationContainer: {
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    padding: 16,
    fontSize: 15,
    textAlign: 'center',
  },
});
