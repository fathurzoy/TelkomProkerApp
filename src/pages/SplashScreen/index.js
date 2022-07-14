import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Logo} from '../../assets';
import {getData} from '../../utils';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      // navigation.navigate('SignIn"); tidak hilang tapi ditumpuk
      getData('token_tel').then(res => {
        console.log('token_tel: ', res);
        if (res) {
          navigation.reset({index: 0, routes: [{name: 'MainApp'}]});
        } else {
          navigation.replace('SignIn'); //page akan hilang
        }
      });
    }, 2000);
  }, []);

  return (
    <View style={styles.pages}>
      <Image
        source={require('./../../assets/Ilustration/logo.png')}
        style={{width: 80, height: 80, marginBottom: 20}}
      />
      <Text>Telkom Proker</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  ilustrasi: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
