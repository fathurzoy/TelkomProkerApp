import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
var width = Dimensions.get('window').width; //full width

const Copyright = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Copyright © 2022 Fathur & Silvi. All Rights Reserved
      </Text>
    </View>
  );
};

export default Copyright;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: 40,
    backgroundColor: 'ghostwhite',
  },
  text: {
    fontSize: 12,
  },
});
