import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {IconPlus} from '../../assets/Icon';
import Copyright from '../../components/molecules/Copyright';
import {getData} from '../../utils';
import CloseProker from './CloseProker';
import ModalProker from './ModalPoker';
import OnProgresProker from './OnProgresProker';
import SemuaProker from './SemuaProker';

const Admin = () => {
  const layout = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);

  const [index, setIndex] = useState(0);
  const [pressTambah, setPressTambah] = useState(false);
  const [username, setUsername] = useState();
  const [akses, setAkses] = useState();

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

  const [routes] = useState([
    {key: 'progres', title: 'On Progres'},
    {key: 'close', title: 'Close'},
    {key: 'semua', title: 'Semua'},
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
        <ModalProker
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
          <Text style={styles.headerTitle}>Proker ADMIN</Text>
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
              progres: () => (
                <OnProgresProker username={username} akses={akses} />
              ),
              close: () => <CloseProker username={username} akses={akses} />,
              semua: () => (
                <SemuaProker
                  showTambah={[pressTambah, setPressTambah]}
                  username={username}
                  akses={akses}
                />
              ),
            })}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={{
              width: Dimensions.get('window').width,
            }}
          />
        </View>
      </View>
      <Copyright />
    </ScrollView>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    height: 1000,
    backgroundColor: 'white',
    padding: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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
