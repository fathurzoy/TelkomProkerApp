import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const Select = ({label, value = '1', onSelectChange, enabled = true}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={value}
          enabled={enabled}
          onValueChange={itemValue => onSelectChange(itemValue)}>
          <Picker.Item label="CME" value="1" />
          <Picker.Item label="TRANSPORT" value="2" />
          <Picker.Item label="IPN" value="3" />
          <Picker.Item label="ADMIN" value="4" />
          <Picker.Item label="IS" value="5" />
        </Picker>
      </View>
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontFamily: 'Poppins-Reguler',
    color: '#020202',
  },
  input: {
    borderWidth: 1,
    borderColor: '#020202',
    borderRadius: 8,
    paddingHorizontal: 2,
    paddingVertical: 0,
  },
});
