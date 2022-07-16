import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Cell, Row, Table, TableWrapper} from 'react-native-table-component';
import {AngleLeft, AngleRight, IconEdit, IconTrash} from '../../assets/Icon';
import {Gap, Select, TextInput} from '../../components/atom';
import SelectGender from '../../components/atom/Select/SelectGender';
import {
  staff_create,
  staff_delete,
  staff_find_many,
  staff_read,
  staff_update,
} from '../../config/API/staff_api';
import {showMessage, useForm} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import PdfExport from './PdfExport';
import ExporExcelStaff from './ExcelExportStaff';

const ModalStaff = ({modal, showTambah}) => {
  const [modalVisible, setModalVisible] = modal;
  const [pressTambah, setPressTambah] = showTambah;
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    id: '',
    nik: null,
    name: null,
    divisi_id: '1',
    posisi: null,
    gender: 'laki-laki',
  });

  useEffect(() => {
    setForm({
      id: '',
      nik: null,
      name: null,
      divisi_id: '1',
      posisi: null,
      gender: 'laki-laki',
    });
  }, [modalVisible]);

  const kelolaStaff = () => {
    if (form.id.toString().length) {
      dispatch(staff_update(form));
    } else {
      dispatch(staff_create(form));
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
              TAMBAH STAFF
            </Text>
            <View style={{width: 250, marginBottom: 10}}>
              <TextInput
                label="Nik"
                placeholder="Masukan Nik"
                value={form.nik}
                onChangeText={value => setForm({...form, nik: value})}
              />
            </View>
            <View style={{width: 250, marginBottom: 10}}>
              <TextInput
                label="Nama"
                placeholder="Masukan Nama"
                value={form.name}
                onChangeText={value => setForm({...form, name: value})}
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
            <View style={{width: 250, marginBottom: 10}}>
              <TextInput
                label="Posisi"
                placeholder="Masukan Posisi"
                value={form.posisi}
                onChangeText={value => setForm({...form, posisi: value})}
              />
            </View>
            <View style={{width: 250, marginBottom: 10}}>
              <SelectGender
                label="Jenis Kelamin"
                placeholder="Masukan Jenis Kelamin"
                value={form.gender}
                onSelectChange={value => setForm({...form, gender: value})}
              />
            </View>
            <View style={{width: 250, marginBottom: 10, marginTop: 10}}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => kelolaStaff()}>
                <Text style={styles.textStyle}>Tambah</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default ModalStaff;

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
