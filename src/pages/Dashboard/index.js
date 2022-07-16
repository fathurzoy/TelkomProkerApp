import {
  Button,
  DrawerLayoutAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../components/molecules/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {getData} from '../../utils';

const Dashboard = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState();

  useEffect(() => {
    getData('username').then(res => {
      setUsername(res.value);
    });
  }, [username]);

  return (
    <View style={styles.container}>
      {/* <Header title={username} onPress={() => drawer.current.openDrawer()} /> */}
      <Text style={styles.headerTitle}>Dashboard</Text>
      <View style={styles.sectionCard}>
        {(username === 'cme' ||
          username === 'admin' ||
          username === 'super_admin') && (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MainDrawer', {
                screen: 'CME',
              })
            }>
            <View
              style={[
                styles.cardContainer,
                styles.shadowProp,
                styles.buttonShadow,
              ]}>
              <View style={styles.headerCard}>
                <Text style={styles.textHeader}>CME</Text>
              </View>
              <View style={styles.bottomCard}>
                <Text style={styles.textBottom}>View details</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {(username === 'transport' ||
          username === 'admin' ||
          username === 'super_admin') && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainDrawer', {
                screen: 'TRANSPORT',
              });
            }}>
            <View
              style={[
                styles.cardContainer,
                styles.shadowProp,
                styles.buttonShadow,
              ]}>
              <View style={styles.headerCard}>
                <Text style={styles.textHeader}>TRANSPORT</Text>
              </View>
              <View style={styles.bottomCard}>
                <Text style={styles.textBottom}>View details</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {(username === 'ipn' ||
          username === 'admin' ||
          username === 'super_admin') && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainDrawer', {
                screen: 'IPN',
              });
            }}>
            <View
              style={[
                styles.cardContainer,
                styles.shadowProp,
                styles.buttonShadow,
              ]}>
              <View style={styles.headerCard}>
                <Text style={styles.textHeader}>IPN</Text>
              </View>
              <View style={styles.bottomCard}>
                <Text style={styles.textBottom}>View details</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {(username === 'admin' ||
          username === 'admin' ||
          username === 'super_admin') && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainDrawer', {
                screen: 'ADMIN',
              });
            }}>
            <View
              style={[
                styles.cardContainer,
                styles.shadowProp,
                styles.buttonShadow,
              ]}>
              <View style={styles.headerCard}>
                <Text style={styles.textHeader}>ADMIN</Text>
              </View>
              <View style={styles.bottomCard}>
                <Text style={styles.textBottom}>View details</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        {(username === 'is' ||
          username === 'admin' ||
          username === 'super_admin') && (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainDrawer', {
                screen: 'IS',
              });
            }}>
            <View
              style={[
                styles.cardContainer,
                styles.shadowProp,
                styles.buttonShadow,
              ]}>
              <View style={styles.headerCard}>
                <Text style={styles.textHeader}>IS</Text>
              </View>
              <View style={styles.bottomCard}>
                <Text style={styles.textBottom}>View details</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  sectionCard: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: 20,
  },
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 20,
  },
  headerCard: {
    backgroundColor: 'red',
    width: 180,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  bottomCard: {
    width: 180,
    height: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  textHeader: {
    color: 'white',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonShadow: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    borderRadius: 10,
  },
});
