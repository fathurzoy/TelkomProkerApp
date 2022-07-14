import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const SelectRole = ({label, value = 1, onSelectChange, ...restProps}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.input}>
        <Picker
          selectedValue={value}
          {...restProps}
          onValueChange={itemValue => onSelectChange(itemValue)}>
          <Picker.Item label="SUPER_ADMIN" value={1} />
          <Picker.Item label="CME" value={2} />
          <Picker.Item label="TRANSPORT" value={3} />
          <Picker.Item label="IPN" value={4} />
          <Picker.Item label="ADMIN" value={5} />
          <Picker.Item label="IS" value={6} />
        </Picker>
      </View>
    </View>
  );
};

export default SelectRole;

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
