import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const SelectBulan = ({label, value, onSelectChange}) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.input}>
        <Picker
          selectedValue={value}
          onValueChange={itemValue => onSelectChange(itemValue)}>
          <Picker.Item label="Bulan" value={null} />
          <Picker.Item label="Januari" value="januari" />
          <Picker.Item label="Febuari" value="febuari" />
          <Picker.Item label="Maret" value="maret" />
          <Picker.Item label="April" value="april" />
          <Picker.Item label="Mei" value="mei" />
          <Picker.Item label="Juni" value="juni" />
          <Picker.Item label="Juli" value="juli" />
          <Picker.Item label="Agustus" value="agustus" />
          <Picker.Item label="September" value="september" />
          <Picker.Item label="Oktober" value="oktober" />
          <Picker.Item label="November" value="november" />
          <Picker.Item label="Desember" value="desember" />
        </Picker>
      </View>
    </View>
  );
};

export default SelectBulan;

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
