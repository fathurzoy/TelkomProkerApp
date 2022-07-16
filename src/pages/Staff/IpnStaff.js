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
  staff_find_many_ipn,
  staff_find_many_transport,
  staff_read,
  staff_update,
} from '../../config/API/staff_api';
import {showMessage, useForm} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import PdfExport from './PdfExport';
import ExporExcelStaff from './ExcelExportStaff';

const IpnRoute = ({akses}) => {
  const [staffListMany, setStaffListMany] = useState([]);
  const [staffListLimit, setStaffListLimit] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [staffClick, setStaffClick] = useState();
  const [page, setPage] = useState(1);
  const [state, setState] = useState({
    tableHead: [
      <Text
        style={{
          paddingLeft: 10,
          paddingRight: 5,
          height: 40,
          width: 80,
          color: 'white',
          textAlignVertical: 'center',
        }}>
        NIK
      </Text>,
      <Text
        style={{paddingLeft: 5, paddingRight: 5, width: 120, color: 'white'}}>
        Nama
      </Text>,
      <Text
        style={{paddingLeft: 5, paddingRight: 5, width: 110, color: 'white'}}>
        Divisi
      </Text>,
      <Text
        style={{paddingLeft: 5, paddingRight: 5, width: 100, color: 'white'}}>
        Posisi
      </Text>,
      <Text
        style={{paddingLeft: 5, paddingRight: 5, width: 120, color: 'white'}}>
        Jenis Kelamin
      </Text>,
      akses && (
        <Text
          style={{paddingLeft: 5, paddingRight: 5, width: 120, color: 'white'}}>
          Aksi
        </Text>
      ),
    ],
  });

  const {isLoading} = useSelector(state => state.globalReducer);

  const getStaffList = async () => {
    let datas = await staff_find_many_ipn(page);
    setStaffListMany(datas);
  };
  const getStaffListLimit = async () => {
    let limit = null;
    let datas = await staff_find_many_ipn(page, limit);
    setStaffListLimit(datas);
  };

  useEffect(() => {
    getStaffList();
    getStaffListLimit();
  }, [page, isLoading]);

  useEffect(() => {
    if (modalVisible === true) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [modalVisible]);

  const editStaff = async rowData => {
    return Alert.alert(
      'Yakin?',
      <View>
        <Text>Hello</Text>
      </View>,
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            setPage(1);
            showMessage('Berhasil Didelete', 'success');
            staff_delete(rowData.id);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ],
    );
  };

  const deleteConfirm = rowData => {
    return Alert.alert('Yakin?', 'Apakah anda yakin ingin menghapus ini?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          setPage(1);
          showMessage('Berhasil Didelete', 'success');
          staff_delete(rowData.id);
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
    ]);
  };

  return (
    <>
      <ModalForm
        modal={[modalVisible, setModalVisible]}
        staffClickData={[staffClick, setStaffClick]}
      />
      <View style={{height: 670}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Text style={{fontSize: 24}}>Staff Ipn</Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <ExporExcelStaff
              dataStaff={staffListLimit}
              title={'Ipn'}
              divisi_id={3}
            />
            <Gap width={10} />
            <PdfExport dataStaff={staffListLimit} title={'Ipn'} divisi_id={3} />
          </View>
        </View>
        <ScrollView horizontal={true}>
          <View style={{height: 670}}>
            <Table>
              <Row
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.textWhite}
              />

              {akses ? (
                Object.keys(staffListMany).length > 0 ? (
                  staffListMany?.query?.map((rowData, index) => {
                    return (
                      <TableWrapper key={index} style={styles.row}>
                        <Cell
                          style={{
                            borderWidth: 1,
                            borderColor: '#000',
                            borderStyle: 'solid',
                          }}
                          data={
                            <Text
                              style={{
                                paddingLeft: 10,
                                paddingLeft: 5,
                                paddingRight: 5,
                                width: 80,
                                color: 'black',
                                paddingVertical: 15,
                              }}>
                              {rowData.nik}
                            </Text>
                          }
                          textStyle={styles.text}
                        />
                        <Cell
                          style={{
                            borderWidth: 1,
                            borderColor: '#000',
                            borderStyle: 'solid',
                          }}
                          data={
                            <Text
                              style={{
                                paddingLeft: 5,
                                paddingRight: 5,
                                width: 120,
                                color: 'black',
                              }}>
                              {rowData.name}
                            </Text>
                          }
                          textStyle={styles.text}
                        />
                        <Cell
                          style={{
                            borderWidth: 1,
                            borderColor: '#000',
                            borderStyle: 'solid',
                          }}
                          data={
                            <Text
                              style={{
                                paddingLeft: 5,
                                paddingRight: 5,
                                width: 110,
                                color: 'black',
                              }}>
                              {rowData.divisi.name}
                            </Text>
                          }
                          textStyle={styles.text}
                        />
                        <Cell
                          style={{
                            borderWidth: 1,
                            borderColor: '#000',
                            borderStyle: 'solid',
                          }}
                          data={
                            <Text
                              style={{
                                paddingLeft: 5,
                                paddingRight: 5,
                                width: 100,
                                color: 'black',
                              }}>
                              {rowData.posisi}
                            </Text>
                          }
                          textStyle={styles.text}
                        />
                        <Cell
                          style={{
                            borderWidth: 1,
                            borderColor: '#000',
                            borderStyle: 'solid',
                          }}
                          data={
                            <Text
                              style={{
                                paddingLeft: 5,
                                paddingRight: 5,
                                width: 120,
                                color: 'black',
                              }}>
                              {rowData.gender}
                            </Text>
                          }
                          textStyle={styles.text}
                        />
                        <Cell
                          style={{
                            borderWidth: 1,
                            borderColor: '#000',
                            borderStyle: 'solid',
                          }}
                          data={
                            <View
                              style={{
                                flexDirection: 'row',
                                width: 120,
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRightWidth: 1,
                                borderRightColor: '#000',
                              }}>
                              <TouchableOpacity
                                onPress={() => {
                                  setStaffClick(rowData);
                                  setModalVisible(true);
                                }}>
                                <IconEdit />
                              </TouchableOpacity>
                              <Gap width={10} />
                              <TouchableOpacity
                                onPress={() => deleteConfirm(rowData)}>
                                <IconTrash />
                              </TouchableOpacity>
                            </View>
                          }
                          textStyle={styles.text}
                        />
                      </TableWrapper>
                    );
                  })
                ) : (
                  <Text>Loading</Text>
                )
              ) : Object.keys(staffListMany).length > 0 ? (
                staffListMany?.query?.map((rowData, index) => {
                  return (
                    <TableWrapper key={index} style={styles.row}>
                      <Cell
                        style={{
                          borderWidth: 1,
                          borderColor: '#000',
                          borderStyle: 'solid',
                        }}
                        data={
                          <Text
                            style={{
                              paddingLeft: 10,
                              paddingLeft: 5,
                              paddingRight: 5,
                              width: 80,
                              color: 'black',
                              paddingVertical: 15,
                            }}>
                            {rowData.nik}
                          </Text>
                        }
                        textStyle={styles.text}
                      />
                      <Cell
                        style={{
                          borderWidth: 1,
                          borderColor: '#000',
                          borderStyle: 'solid',
                        }}
                        data={
                          <Text
                            style={{
                              paddingLeft: 5,
                              paddingRight: 5,
                              width: 120,
                              color: 'black',
                            }}>
                            {rowData.name}
                          </Text>
                        }
                        textStyle={styles.text}
                      />
                      <Cell
                        style={{
                          borderWidth: 1,
                          borderColor: '#000',
                          borderStyle: 'solid',
                        }}
                        data={
                          <Text
                            style={{
                              paddingLeft: 5,
                              paddingRight: 5,
                              width: 110,
                              color: 'black',
                            }}>
                            {rowData.divisi.name}
                          </Text>
                        }
                        textStyle={styles.text}
                      />
                      <Cell
                        style={{
                          borderWidth: 1,
                          borderColor: '#000',
                          borderStyle: 'solid',
                        }}
                        data={
                          <Text
                            style={{
                              paddingLeft: 5,
                              paddingRight: 5,
                              width: 100,
                              color: 'black',
                            }}>
                            {rowData.posisi}
                          </Text>
                        }
                        textStyle={styles.text}
                      />
                      <Cell
                        style={{
                          borderWidth: 1,
                          borderColor: '#000',
                          borderStyle: 'solid',
                          borderRightWidth: 1,
                        }}
                        data={
                          <Text
                            style={{
                              paddingLeft: 5,
                              paddingRight: 5,
                              width: 120,
                              color: 'black',
                            }}>
                            {rowData.gender}
                          </Text>
                        }
                        textStyle={styles.text}
                      />
                    </TableWrapper>
                  );
                })
              ) : (
                <Text>Loading</Text>
              )}
            </Table>
          </View>
        </ScrollView>
        {Object.keys(staffListMany)?.length > 0 && (
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>
              Page {staffListMany?.current_page} of {staffListMany?.total_page}
            </Text>
            <View
              style={{
                marginLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setPage(staffListMany?.current_page - 1);
                }}
                disabled={staffListMany.current_page <= 1}>
                <AngleLeft />
              </TouchableOpacity>
              <Text style={{paddingHorizontal: 10}}>
                {staffListMany?.current_page}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setPage(staffListMany?.current_page + 1);
                }}
                disabled={
                  staffListMany.current_page >= staffListMany.total_page
                }>
                <AngleRight />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default IpnRoute;

const ModalForm = ({modal, staffClickData}) => {
  const [modalVisible, setModalVisible] = modal;
  const [staffClick, setStaffClick] = staffClickData;
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    id: '',
    nik: null,
    name: null,
    divisi_id: 1,
    posisi: null,
    gender: 'laki-laki',
  });

  const setDataForm = async () => {
    setForm({
      id: staffClick.id,
      nik: staffClick.nik,
      name: staffClick.name,
      divisi_id: staffClick.divisi_id.toString(),
      posisi: staffClick.posisi,
      gender: staffClick.gender,
    });
  };

  useEffect(() => {
    if (staffClick) {
      setDataForm();
    } else {
      setForm({
        id: '',
        nik: null,
        name: null,
        divisi_id: 1,
        posisi: null,
        gender: 'laki-laki',
      });
    }
  }, [modalVisible]);

  const kelolaStaff = () => {
    if (form.id.toString().length) {
      dispatch(staff_update(form));
    } else {
      dispatch(staff_create(form));
    }
    setModalVisible(!modalVisible);
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
      }}>
      <ScrollView>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{marginBottom: 10}}>
              {staffClick == undefined ? 'TAMBAH' : 'EDIT'} STAFF
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
                <Text style={styles.textStyle}>
                  {staffClick == undefined ? 'Tambah' : 'Edit'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

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
