import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Gap, TextInput} from '../../components/atom';
import {IconEdit} from '../../assets/Icon';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getData, showMessage} from '../../utils';
import SelectRole from '../../components/atom/Select/SelectRole';
import {admin_update} from '../../config/API/login_api';

const Setting = () => {
  const [userAdminId, setUserAdminId] = useState();
  const [userClickDataId, setUserClickDataId] = useState();
  const [username, setUsername] = useState();
  const [usernameClick, setUsernameClick] = useState();
  const [tokenTel, setTokenTel] = useState();
  const [role, setRole] = useState();
  const {isLoading} = useSelector(state => state.globalReducer);
  const [modalVisible, setModalVisible] = useState(false);

  // const getRequestList = async () => {
  //   let datas = await proker_find_many_status({status: 'request'});
  //   setRequestList(datas);
  //   // console.log(datas);
  // };
  // const getRequestListId = async () => {
  //   let datas = await proker_find_many_status({
  //     status: 'request',
  //     divisi_id: userAdminId,
  //   });
  //   setRequestList(datas);
  //   // console.log(datas);
  // };

  useEffect(() => {
    getData('token_tel').then(res => {
      setTokenTel(res.value);
    });
    getData('username').then(res => {
      setUsername(res.value);
      if (res.value == 'cme') {
        setUserAdminId(2);
      } else if (res.value == 'transport') {
        setUserAdminId(3);
      } else if (res.value == 'ipn') {
        setUserAdminId(4);
      } else if (res.value == 'admin') {
        setUserAdminId(5);
      } else if (res.value == 'is') {
        setUserAdminId(6);
      } else if (res.value == 'super_admin') {
        setUserAdminId(1);
      }

      // if (res.value === 'admin' || res.value === 'super_admin') {
      //   getRequestList();
      // } else {
      //   getRequestListId(userAdminId);
      // }
    });
  }, [isLoading]);

  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <ModalForm
          tokenTel={tokenTel}
          usernameClick={usernameClick}
          role={role}
          modal={[modalVisible, setModalVisible]}
          userClickData={[userClickDataId, setUserClickDataId]}
        />
        {/* <Header title={username} onPress={() => drawer.current.openDrawer()} /> */}
        <Text style={styles.headerTitle}>Setting</Text>
        <View style={styles.sectionCard}>
          {(userAdminId === 2 || userAdminId === 1) && (
            <>
              <View
                style={[
                  styles.cardContainer,
                  styles.shadowProp,
                  styles.buttonShadow,
                ]}>
                <View style={styles.headerCard}>
                  <Text style={styles.textHeader}>CME</Text>
                </View>
                <View style={styles.bottomCard}>
                  <Text style={styles.textBottom}>Username : cme</Text>
                  <Text style={styles.textBottom}>Role : cme</Text>
                  <Gap height={50} />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setUserClickDataId(2);
                        setUsernameClick('cme');
                        setRole(2);
                        setModalVisible(!modalVisible);
                      }}>
                      <IconEdit />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
          {(userAdminId === 3 || userAdminId === 1) && (
            <>
              <View
                style={[
                  styles.cardContainer,
                  styles.shadowProp,
                  styles.buttonShadow,
                ]}>
                <View style={styles.headerCard}>
                  <Text style={styles.textHeader}>TRANSPORT</Text>
                </View>
                <View style={styles.bottomCard}>
                  <Text style={styles.textBottom}>Username : transport</Text>
                  <Text style={styles.textBottom}>Role : transport</Text>
                  <Gap height={50} />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setUserClickDataId(3);
                        setUsernameClick('transport');
                        setRole(3);
                        setModalVisible(!modalVisible);
                      }}>
                      <IconEdit />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
          {(userAdminId === 4 || userAdminId === 1) && (
            <>
              <View
                style={[
                  styles.cardContainer,
                  styles.shadowProp,
                  styles.buttonShadow,
                ]}>
                <View style={styles.headerCard}>
                  <Text style={styles.textHeader}>IPN</Text>
                </View>
                <View style={styles.bottomCard}>
                  <Text style={styles.textBottom}>Username : ipn</Text>
                  <Text style={styles.textBottom}>Role : ipn</Text>
                  <Gap height={50} />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setUserClickDataId(4);
                        setUsernameClick('ipn');
                        setRole(4);
                        setModalVisible(!modalVisible);
                      }}>
                      <IconEdit />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
          {(userAdminId === 5 || userAdminId === 1) && (
            <>
              <View
                style={[
                  styles.cardContainer,
                  styles.shadowProp,
                  styles.buttonShadow,
                ]}>
                <View style={styles.headerCard}>
                  <Text style={styles.textHeader}>ADMIN</Text>
                </View>
                <View style={styles.bottomCard}>
                  <Text style={styles.textBottom}>Username : admin</Text>
                  <Text style={styles.textBottom}>Role : admin</Text>
                  <Gap height={50} />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setUserClickDataId(5);
                        setUsernameClick('admin');
                        setRole(5);
                        setModalVisible(!modalVisible);
                      }}>
                      <IconEdit />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
          {(userAdminId === 6 || userAdminId === 1) && (
            <>
              <View
                style={[
                  styles.cardContainer,
                  styles.shadowProp,
                  styles.buttonShadow,
                ]}>
                <View style={styles.headerCard}>
                  <Text style={styles.textHeader}>IS</Text>
                </View>
                <View style={styles.bottomCard}>
                  <Text style={styles.textBottom}>Username : is</Text>
                  <Text style={styles.textBottom}>Role : is</Text>
                  <Gap height={50} />
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 12,
                      right: 15,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setUserClickDataId(6);
                        setUsernameClick('is');
                        setRole(6);
                        setModalVisible(!modalVisible);
                      }}>
                      <IconEdit />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Setting;

const ModalForm = ({modal, userClickData, tokenTel, usernameClick, role}) => {
  const [modalVisible, setModalVisible] = modal;
  const [userClickDataId, setUserClickDataId] = userClickData;
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    id: null,
    username: null,
    new_password: null,
    confirm_password: null,
    role: 1,
  });

  const setDataForm = async () => {
    setForm({
      id: userClickDataId,
      username: usernameClick,
      role: role,
    });
  };

  useEffect(() => {
    setDataForm();
  }, [modalVisible]);

  const kelolaUser = () => {
    if (form.new_password !== form.confirm_password) {
      showMessage('Gagal, Password tidak sama', 'error');
    } else {
      dispatch(
        admin_update({
          id: form.id,
          password: form.new_password,
          token: tokenTel,
        }),
      );
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
            <Text style={{marginBottom: 10}}>EDIT USER</Text>
            <View style={{width: 250, marginBottom: 10}}>
              <TextInput
                label="Username"
                placeholder="Username"
                editable={false}
                selectTextOnFocus={false}
                value={form.username}
                onChangeText={value => setForm({...form, username: value})}
              />
            </View>
            <View style={{width: 250, marginBottom: 10}}>
              <TextInput
                label="Ubah Password"
                placeholder="Masukan Password"
                value={form.new_password}
                onChangeText={value => setForm({...form, new_password: value})}
              />
            </View>
            <View style={{width: 250, marginBottom: 10}}>
              <TextInput
                label="Komfirm Password"
                placeholder="Masukan Ulan Password"
                value={form.confirm_password}
                onChangeText={value =>
                  setForm({...form, confirm_password: value})
                }
              />
            </View>
            <View style={{width: 250, marginBottom: 10}}>
              <SelectRole
                label="Role"
                editable={false}
                selectTextOnFocus={false}
                placeholder="Masukan Role"
                enabled={false}
                value={form.role}
                onSelectChange={value => setForm({...form, role: value})}
              />
            </View>
            <View style={{width: 250, marginBottom: 10, marginTop: 10}}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => kelolaUser()}>
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
    flex: 1,
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
  cardContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    marginBottom: 20,
  },
  headerCard: {
    backgroundColor: 'red',
    width: 180,
    height: 40,
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  bottomCard: {
    width: 180,
    padding: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    paddingHorizontal: 6,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  textHeader: {
    color: 'white',
    textAlign: 'left',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonShadow: {
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android
    borderRadius: 10,
  },
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
