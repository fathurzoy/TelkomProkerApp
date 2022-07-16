import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';
import {DrawerActions} from '@react-navigation/native';
import {
  BarSolid,
  IconCircleCheck,
  IconCommentDots,
  IconRollback,
} from '../assets';
import {Avatar} from 'react-native-paper';
import {Gap} from '../components/atom';
import {Badge} from 'react-native-elements';
import {Card} from 'react-native-elements/dist/card/Card';
import {getData, showMessage} from '../utils';
import {proker_close, proker_find_many_status} from '../config/API/proker_api';
import {useDispatch, useSelector} from 'react-redux';

function CustomHeader(props) {
  const [modalComment, setModalComment] = useState(false);
  const [requestAdminId, setRequestAdminId] = useState();
  const [requestList, setRequestList] = useState([{}]);
  const [username, setUsername] = useState();
  const {isLoading} = useSelector(state => state.globalReducer);

  const toggleDrawer = () =>
    props.navigation.dispatch(DrawerActions.toggleDrawer());

  const getRequestList = async () => {
    let datas = await proker_find_many_status({status: 'request'});
    setRequestList(datas);
    // console.log(datas);
  };
  const getRequestListId = async () => {
    let datas = await proker_find_many_status({
      status: 'request',
      divisi_id: requestAdminId,
    });
    setRequestList(datas);
    // console.log(datas);
  };

  useEffect(() => {
    getData('username').then(res => {
      setUsername(res.value);
      if (res.value == 'cme') {
        setRequestAdminId(1);
      } else if (res.value == 'transport') {
        setRequestAdminId(2);
      } else if (res.value == 'ipn') {
        setRequestAdminId(3);
      } else if (res.value == 'admin') {
        setRequestAdminId(4);
      } else if (res.value == 'is') {
        setRequestAdminId(5);
      } else if (res.value == 'super_admin') {
        setRequestAdminId(4);
      }

      if (res.value === 'admin' || res.value === 'super_admin') {
        getRequestList();
      } else {
        getRequestListId(requestAdminId);
      }
    });
  }, [isLoading]);

  return (
    <SafeAreaView>
      <ModalForm
        modal={[modalComment, setModalComment]}
        dataRequest={requestList}
        dataId={requestAdminId}
        username={username}
      />
      <View style={styles.headerContainer}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            onPress={toggleDrawer}
            activeOpacity={0.7}
            style={styles.leftButton}
            testID="CustomHeader-toggleDrawer">
            <BarSolid />
          </TouchableOpacity>

          <View>
            <TouchableOpacity
              onPress={() => setModalComment(!modalComment)}
              activeOpacity={0.7}
              style={styles.leftButton}
              testID="CustomHeader-toggleDrawer">
              <IconCommentDots />
            </TouchableOpacity>

            <Badge
              status="error"
              value={
                requestList?.query?.length == 0
                  ? null
                  : requestList?.query?.length
              }
              containerStyle={{position: 'absolute', top: -5, right: -5}}
            />
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.headerTxt}>{props.username}</Text>
          <Gap width={10} />
          <Avatar.Image
            size={30}
            source={require('./../assets/Icon/avatar.png')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const ModalForm = ({modal, dataRequest, dataId, username}) => {
  const [modalVisible, setModalVisible] = modal;
  const dispatch = useDispatch();

  const updateStatusProker = ({id, status, keterangan}) => {
    if (status === 'close') {
      Alert.alert('Yakin?', 'Apakah anda yakin ingin mengaccept close ini?', [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            showMessage('Berhasil Accept Close', 'success');
            dispatch(proker_close({id, status, keterangan}));
            setModalVisible(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ]);
    } else {
      Alert.alert(
        'Yakin?',
        'Apakah anda yakin ingin membatalkan request ini?',
        [
          // The "Yes" button
          {
            text: 'Yes',
            onPress: () => {
              showMessage('Berhasil Membatalkan Request', 'success');
              dispatch(proker_close({id, status, keterangan}));
              setModalVisible(false);
            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: 'No',
          },
        ],
      );
    }
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
            <Text style={{marginBottom: 15, fontSize: 20, fontWeight: 'bold'}}>
              Request Close
            </Text>
            {dataRequest &&
              dataRequest?.query?.map((rowData, index) => {
                // console.log(rowData);
                return (
                  <Card containerStyle={{borderRadius: 10}}>
                    <Text
                      style={{
                        borderBottomWidth: 1,
                        fontWeight: 'bold',
                        paddingBottom: 5,
                      }}>
                      {rowData.divisi.name}
                    </Text>
                    <View style={{marginTop: 10, marginBottom: 15}}>
                      <Text>
                        <Text
                          style={{
                            fontWeight: '600',
                            textTransform: 'capitalize',
                          }}>
                          nama program
                        </Text>{' '}
                        : {rowData.nama_program}
                      </Text>
                      <Text>
                        <Text
                          style={{
                            fontWeight: '600',
                            textTransform: 'capitalize',
                          }}>
                          plan
                        </Text>{' '}
                        : {rowData.plan}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          updateStatusProker({
                            id: rowData.id,
                            status: 'progres',
                            keterangan: 'progres',
                          });
                        }}>
                        <IconRollback />
                      </TouchableOpacity>

                      {(username === 'admin' || username === 'super_admin') && (
                        <>
                          <Gap width={5} />
                          <TouchableOpacity
                            onPress={() => {
                              updateStatusProker({
                                id: rowData.id,
                                status: 'close',
                                keterangan: 'close',
                              });
                            }}>
                            <IconCircleCheck />
                          </TouchableOpacity>
                        </>
                      )}
                    </View>
                  </Card>
                );
              })}
          </View>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'red',
    minHeight: 60,
  },
  headerLeft: {
    flexDirection: 'row',
  },
  leftButton: {
    marginLeft: 15,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 20,
  },
  buttonTxt: {
    color: '#fff',
    fontWeight: 'bold',
  },
  headerTxt: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
});

export default CustomHeader;
