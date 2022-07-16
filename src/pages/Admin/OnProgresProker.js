import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Cell, Row, Table, TableWrapper} from 'react-native-table-component';
import {
  AngleLeft,
  AngleRight,
  IconClose,
  IconEdit,
  IconTrash,
} from '../../assets/Icon';
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
import {
  proker_close,
  proker_create,
  proker_find_many_status,
  proker_update,
} from '../../config/API/proker_api';
import SelectBulan from '../../components/atom/Select/SelectBulan';
import ExcelExportProker from './ExcelExportProker';
import PdfExportProker from './PdfExportProker';

const OnProgresProker = ({akses}) => {
  const [prokerListMany, setProkerListMany] = useState([]);
  const [prokerListLimit, setProkerListLimit] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [staffClick, setStaffClick] = useState();
  const [page, setPage] = useState(1);
  const [filterMonth, setFilterMonth] = useState(null);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    tableHead: [
      <Text
        style={{
          paddingLeft: 10,
          paddingRight: 5,
          height: 40,
          width: 50,
          color: 'white',
          textAlignVertical: 'center',
        }}>
        No
      </Text>,
      <Text
        style={{paddingLeft: 5, paddingRight: 5, width: 120, color: 'white'}}>
        Nama Program
      </Text>,
      <Text
        style={{paddingLeft: 5, paddingRight: 5, width: 350, color: 'white'}}>
        Action Plan
      </Text>,
      <Text
        style={{paddingLeft: 5, paddingRight: 5, width: 100, color: 'white'}}>
        Target
      </Text>,
      <Text
        style={{paddingLeft: 5, paddingRight: 5, width: 120, color: 'white'}}>
        Keterangan
      </Text>,
      <Text
        style={{paddingLeft: 5, paddingRight: 5, width: 120, color: 'white'}}>
        Bulan
      </Text>,
      <Text
        style={{paddingLeft: 5, paddingRight: 5, width: 120, color: 'white'}}>
        Action
      </Text>,
    ],
  });

  const {isLoading} = useSelector(state => state.globalReducer);

  const getProkerfList = async () => {
    let divisi_id = 4;
    let datas = await proker_find_many_status({
      page,
      divisi_id,
      status: 'progres',
    });
    setProkerListMany(datas);
  };

  const getProkerfListBulan = async () => {
    let divisi_id = 4;
    let datas = await proker_find_many_status({
      page,
      divisi_id,
      status: 'progres',
      bulan: filterMonth,
    });
    setProkerListMany(datas);
  };
  const getProkerfListLimit = async () => {
    let divisi_id = 4;
    let limit = null;
    let datas = await proker_find_many_status({
      page,
      limit,
      divisi_id,
      status: 'progres',
    });
    setProkerListLimit(datas);
  };
  const getProkerfListLimitBulan = async () => {
    let divisi_id = 4;
    let limit = null;
    let datas = await proker_find_many_status({
      page,
      limit,
      divisi_id,
      status: 'progres',
      bulan: filterMonth,
    });
    setProkerListLimit(datas);
  };

  useEffect(() => {
    if (filterMonth === null) {
      getProkerfList();
    } else {
      getProkerfListBulan();
    }
    // if (filterMonth === null) {
    //   getProkerfListLimit();
    // } else {
    //   getProkerfListLimitBulan();
    // }
  }, [page, isLoading, filterMonth]);

  useEffect(() => {
    if (modalVisible === true) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [modalVisible]);

  const editProker = async rowData => {
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

  const closeConfirm = ({id, status, keterangan}) => {
    return Alert.alert('Yakin?', 'Apakah anda yakin ingin close program ini?', [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          setPage(1);
          showMessage('Berhasil Diclose', 'success');
          dispatch(proker_close({id, status, keterangan}));
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
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <View style={{width: 150}}>
            <SelectBulan
              value={filterMonth}
              onSelectChange={value => setFilterMonth(value)}
            />
          </View>
          {/* <Text style={{fontSize: 24}}>Staff CME</Text> */}
          <View
            style={{
              flexDirection: 'row',
            }}>
            <ExcelExportProker
              dataProker={prokerListLimit}
              title={'ADMIN'}
              divisi={'ADMIN'}
              divisi_id={4}
              filterMonth={filterMonth}
              status={'progres'}
            />
            <Gap width={10} />
            <PdfExportProker
              dataProker={prokerListLimit}
              title={'ADMIN'}
              divisi={'ADMIN'}
              divisi_id={4}
              filterMonth={filterMonth}
              status={'progres'}
            />
          </View>
        </View>
        <ScrollView horizontal={true}>
          <View>
            <Table>
              <Row
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.textWhite}
              />

              {Object.keys(prokerListMany).length > 0 ? (
                prokerListMany?.query?.map((rowData, index) => {
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
                              width: 50,
                              color: 'black',
                              paddingVertical: 15,
                            }}>
                            {page * 10 - 10 + index + 1}
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
                            {rowData.nama_program}
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
                              paddingVertical: 5,
                              width: 350,
                              color: 'black',
                            }}>
                            {rowData.plan}
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
                            {rowData.target}
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
                            {rowData.keterangan}
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
                            {rowData.bulan}
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
                              onPress={() =>
                                closeConfirm({
                                  id: rowData.id,
                                  status: 'request',
                                  keterangan: 'request',
                                })
                              }>
                              <IconClose />
                            </TouchableOpacity>
                          </View>
                        }
                        textStyle={styles.text}
                      />
                    </TableWrapper>
                  );
                })
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator size="large" color="#1abc9c" />
                  <Gap width={10} />
                  <Text>Loading...</Text>
                </View>
              )}
            </Table>
          </View>
        </ScrollView>
        {Object.keys(prokerListMany)?.length > 0 && (
          <View
            style={{
              marginTop: 5,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>
              Page {prokerListMany?.current_page} of{' '}
              {prokerListMany?.total_page}
            </Text>
            <View
              style={{
                marginLeft: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setPage(prokerListMany?.current_page - 1);
                }}
                disabled={prokerListMany.current_page <= 1}>
                <AngleLeft />
              </TouchableOpacity>
              <Text style={{paddingHorizontal: 10}}>
                {prokerListMany?.current_page}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setPage(prokerListMany?.current_page + 1);
                }}
                disabled={
                  prokerListMany.current_page >= prokerListMany.total_page
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

export default OnProgresProker;

const ModalForm = ({modal, staffClickData}) => {
  const [modalVisible, setModalVisible] = modal;
  const [staffClick, setStaffClick] = staffClickData;
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    id: null,
    nama_program: null,
    plan: null,
    target: null,
    bulan: null,
    divisi_id: '4',
  });

  const setDataForm = async () => {
    setForm({
      id: staffClick.id,
      nama_program: staffClick.nama_program,
      plan: staffClick.plan,
      target: staffClick.target,
      bulan: staffClick.bulan,
      divisi_id: staffClick.divisi_id.toString(),
    });
  };

  useEffect(() => {
    // console.log(staffClick);
    if (staffClick) {
      setDataForm();
    } else {
      setForm({
        id: null,
        nama_program: null,
        plan: null,
        target: null,
        bulan: null,
        divisi_id: '4',
      });
    }
  }, [modalVisible]);

  const kelolaProker = () => {
    if (form.id == null) {
      dispatch(proker_create(form));
    } else {
      dispatch(proker_update(form));
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
            <Text style={{marginBottom: 30, fontSize: 20, fontWeight: 'bold'}}>
              EDIT PROKER
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
                enabled={false}
                placeholder="Masukan Divisi"
                value={form.divisi_id}
                onSelectChange={value => setForm({...form, divisi_id: value})}
              />
            </View>
            <View style={{width: 250, marginBottom: 10, marginTop: 10}}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => kelolaProker()}>
                <Text style={styles.textStyle}>Update</Text>
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
