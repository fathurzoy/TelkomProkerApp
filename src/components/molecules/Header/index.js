import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {BarSolid, IcBack} from '../../../assets';
import {Gap} from '../../atom';

const Header = ({title, onPress}) => {
  return (
    <View style={styles.container}>
      {/* <Button type="icon-only" icon="back-dark" onPress={onPress} /> */}
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <BarSolid />
      </TouchableOpacity>
      <Gap width={24} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 25,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    textAlign: 'left',
    flex: 1,
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
});
