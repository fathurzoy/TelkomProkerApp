import React, {useEffect, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Select, TextInput} from '../../components/atom';
import SelectBulan from '../../components/atom/Select/SelectBulan';
import {proker_create, proker_update} from '../../config/API/proker_api';

const ModalProker = ({modal, showTambah}) => {
  const [modalVisible, setModalVisible] = modal;
  const [pressTambah, setPressTambah] = showTambah;
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    id: null,
    nama_program: null,
    plan: null,
    target: null,
    bulan: null,
    divisi_id: '1',
  });

  useEffect(() => {
    setForm({
      id: null,
      nama_program: null,
      plan: null,
      target: null,
      bulan: null,
      divisi_id: '1',
    });
  }, [modalVisible]);

  const kelolaProker = () => {
    if (form.id == null) {
      dispatch(proker_create(form));
    } else {
      dispatch(proker_update(form));
    }
    setModalVisible(!modalVisible);
    setPressTambah(false);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      backdropOpacity={0.1}
      wipeToClose={true}
      swipeArea={20} // The height in pixels of the swipeable area, window height by default
      swipeThreshold={50}
      onRequestClose={() => {
        // Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
        setPressTambah(false);
      }}>
      <ScrollView>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{marginBottom: 30, fontSize: 20, fontWeight: 'bold'}}>
              TAMBAH PROKER
            </Text>
            <View style={{width: 250, marginBottom: 10}}>
              <TextInput
                label="Nama Program"
                placeholder="Masukan Nama Program"
                value={form.nama_program}
                onChangeText={value => setForm({...form, nama_program: value})}
              />
            </View>
            <View style={{width: 250, marginBottom: 10}}>
              <TextInput
                label="Plan"
                multiline={true}
                numberOfLines={4}
                placeholder="Masukan Plan"
                value={form.plan}
                onChangeText={value => setForm({...form, plan: value})}
              />
            </View>
            <View style={{width: 250, marginBottom: 10}}>
              <TextInput
                label="Target"
                placeholder="Masukan Target"
                value={form.target}
                onChangeText={value => setForm({...form, target: value})}
              />
            </View>
            <View style={{width: 250, marginBottom: 10}}>
              <SelectBulan
                label="Bulan"
                placeholder="Masukan Bulan"
                value={form.bulan}
                onSelectChange={value => setForm({...form, bulan: value})}
              />
            </View>
            <View style={{width: 250, marginBottom: 10}}>
              <Select
                label="Divisi"
                placeholder="Masukan Divisi"
                value={form.divisi_id}
                onSelectChange={value => setForm({...form, divisi_id: value})}
              />
            </View>
            <View style={{width: 250, marginBottom: 10, marginTop: 10}}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => kelolaProker()}>
                <Text style={styles.textStyle}>Tambah</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalProker;

const styles = StyleSheet.create({
  container: {
    height: 1000,
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
  head: {backgroundColor: '#fb0b12'},
  textWhite: {color: '#fff'},
  row: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
  },
  btnText: {textAlign: 'center', color: '#fff'},
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});
