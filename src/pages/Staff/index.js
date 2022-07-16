import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {staff_delete, staff_read} from '../../config/API/staff_api';
import Axios from 'axios';
import {API_HOST} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {AngleLeft, AngleRight, IconPlus, IcPlus} from '../../assets/Icon';
import {getData, showMessage, useForm} from '../../utils';
import {Gap, TextInput} from '../../components/atom';
import SemuaRoute from './SemuaStaff';
import CmeRoute from './CmeStaff';
import IsRoute from './IsStaff';
import AdminRoute from './AdminStaff';
import IpnRoute from './IpnStaff';
import TransportRoute from './TransportStaff';
import ModalStaff from './ModalStaff';

// const renderScene = SceneMap({
// semua: () => <SemuaRoute />,
// cme: () => <CmeRoute />,
// transport: () => <TransportRoute />,
// ipn: () => <IpnRoute />,
// admin: () => <AdminRoute />,
// is: () => <IsRoute />,
// });

const Staff = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [pressTambah, setPressTambah] = useState(false);
  const [username, setUsername] = useState();
  const [akses, setAkses] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getData('username').then(res => {
      setUsername(res.value);
      if (res.value == 'admin' || res.value == 'super_admin') {
        setAkses(true);
      }
    });
  }, []);

  useEffect(() => {
    // console.log(index);
  }, [index]);

  const [routes] = React.useState([
    {key: 'semua', title: 'SEMUA'},
    {key: 'cme', title: 'CME'},
    {key: 'transport', title: 'TRANSPORT'},
    {key: 'ipn', title: 'IPN'},
    {key: 'admin', title: 'ADMIN'},
    {key: 'is', title: 'IS'},
  ]);
  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={'red'}
      inactiveColor={'black'}
      pressColor={'red'}
      indicatorStyle={{
        backgroundColor: 'red',
      }}
      scrollEnabled
      tabStyle={{width: 120}}
      style={{marginTop: 25, backgroundColor: 'white'}}
    />
  );
  return (
    <ScrollView horizontal={false} showsVerticalScrollIndicator>
      <View style={styles.container}>
        {/* <Header title={username} onPress={() => drawer.current.openDrawer()} /> */}
        <ModalStaff
          modal={[modalVisible, setModalVisible]}
          showTambah={[pressTambah, setPressTambah]}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <Text style={styles.headerTitle}>STAFF</Text>
          {akses && (
            <TouchableOpacity
              onPress={() => {
                setPressTambah(true);
                setModalVisible(true);
              }}>
              <View>
                <IconPlus />
              </View>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex: 1}}>
          <TabView
            navigationState={{index, routes}}
            renderScene={SceneMap({
              semua: () => <SemuaRoute username={username} akses={akses} />,
              cme: () => <CmeRoute username={username} akses={akses} />,
              transport: () => (
                <TransportRoute username={username} akses={akses} />
              ),
              ipn: () => <IpnRoute username={username} akses={akses} />,
              admin: () => <AdminRoute username={username} akses={akses} />,
              is: () => <IsRoute username={username} akses={akses} />,
            })}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={{
              width: Dimensions.get('window').width,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default Staff;

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
  row: {flexDirection: 'row', backgroundColor: '#FFF'},
  btn: {width: 120, backgroundColor: '#78B7BB', borderRadius: 2},
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
