import 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Admin,
  Cme,
  Dashboard,
  Ipn,
  Is,
  Semua,
  Setting,
  SignIn,
  SplashScreen,
  Staff,
  Transport,
  // SuccessOrder,
  // SuccessSignUp,
} from '../pages';

import {NavigationContainer} from '@react-navigation/native';
// import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {
  drawerItemsCme,
  drawerItemsIpn,
  drawerItemsIs,
  drawerItemsMain,
  drawerItemsTransport,
} from './drawerItemsMain';
import CustomDrawerContent from './CustomDrawerContent.js';
import CustomHeader from './CustomHeader';
import {Image, Text, View} from 'react-native';
import CustomSidebarMenu from './CustomSidebarMenu';
import {getData} from '../utils';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawerNavigation() {
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

  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerContent={props =>
        username === 'cme' ? (
          <CustomDrawerContent drawerItems={drawerItemsCme} {...props} />
        ) : username === 'transport' ? (
          <CustomDrawerContent drawerItems={drawerItemsTransport} {...props} />
        ) : username === 'ipn' ? (
          <CustomDrawerContent drawerItems={drawerItemsIpn} {...props} />
        ) : username === 'is' ? (
          <CustomDrawerContent drawerItems={drawerItemsIs} {...props} />
        ) : (
          <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
        )
      }>
      <Drawer.Screen
        name="Dashboard"
        component={() => <Dashboard />}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./../assets/Icon/ic-order-on.svg')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="SEMUA"
        component={() => <Semua />}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./../assets/Icon/ic-order-on.svg')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="CME"
        component={() => <Cme />}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./../assets/Icon/ic-order-on.svg')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="TRANSPORT"
        component={() => <Transport />}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./../assets/Icon/ic-order-on.svg')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="IPN"
        component={() => <Ipn />}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./../assets/Icon/ic-order-on.svg')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="ADMIN"
        component={() => <Admin />}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./../assets/Icon/ic-order-on.svg')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="IS"
        component={() => <Is />}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./../assets/Icon/ic-order-on.svg')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Staff"
        component={() => <Staff />}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./../assets/Icon/ic-order-on.svg')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={() => <Setting />}
        options={{
          drawerIcon: ({focused, size}) => (
            <Image
              source={require('./../assets/Icon/ic-order-on.svg')}
              style={{width: 20, height: 20}}
            />
          ),
        }}
      />
      {/* <Drawer.Screen name="Settings1" component={Settings1Screen} /> */}
    </Drawer.Navigator>
  );
}

const MainApp = () => {
  const [username, setUsername] = useState();

  useEffect(() => {
    getData('username').then(res => {
      setUsername(res.value);
    });
  }, [username]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#404554',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        header: props => {
          return <CustomHeader {...props} username={username} />;
        },
      }}>
      <Stack.Screen name="MainDrawer" component={MainDrawerNavigation} />
    </Stack.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;

// function MainDrawerNavigation() {
//   return (
//     <Drawer.Navigator
//       initialRouteName="Dashboard"
//       drawerContent={props => <CustomSidebarMenu {...props} />}>
//       <Drawer.Screen
//         name="Dashboard"
//         component={HomeScreen}
//         options={{
//           drawerLabel: 'Dashboard',
//           // Section/Group Name
//           activeTintColor: '#e91e63',
//           drawerIcon: ({focused, size}) => (
//             <Image
//               source={require('./../assets/Icon/ic-order-on.svg')}
//               style={{}}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Proker"
//         component={HomeScreen}
//         options={{
//           drawerLabel: 'SEMUA',
//           // Section/Group Name
//           groupName: 'Proker',
//           activeTintColor: '#e91e63',
//           drawerIcon: ({focused, size}) => (
//             <Image
//               source={require('./../assets/Icon/bars-solid.svg')}
//               style={{width: 20, height20}}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="CME"
//         component={HomeScreen}
//         options={{
//           drawerLabel: 'CME',
//           // Section/Group Name
//           groupName: 'Proker',
//           activeTintColor: '#e91e63',
//           drawerIcon: ({focused, size}) => (
//             <Image
//               source={require('./../assets/Icon/ic-order-on.svg')}
//               style={{}}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="TRANSPORT"
//         component={HomeScreen}
//         options={{
//           drawerLabel: 'TRANSPORT',
//           // Section/Group Name
//           groupName: 'Proker',
//           activeTintColor: '#e91e63',
//           drawerIcon: ({focused, size}) => (
//             <Image
//               source={require('./../assets/Icon/ic-order-on.svg')}
//               style={{}}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="IPN"
//         component={HomeScreen}
//         options={{
//           drawerLabel: 'IPN',
//           // Section/Group Name
//           groupName: 'Proker',
//           activeTintColor: '#e91e63',
//           drawerIcon: ({focused, size}) => (
//             <Image
//               source={require('./../assets/Icon/ic-order-on.svg')}
//               style={{}}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="ADMIN"
//         component={HomeScreen}
//         options={{
//           drawerLabel: 'ADMIN',
//           // Section/Group Name
//           groupName: 'Proker',
//           activeTintColor: '#e91e63',
//           drawerIcon: ({focused, size}) => (
//             <Image
//               source={require('./../assets/Icon/ic-order-on.svg')}
//               style={{}}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="IS"
//         component={HomeScreen}
//         options={{
//           drawerLabel: 'IS',
//           // Section/Group Name
//           groupName: 'Proker',
//           activeTintColor: '#e91e63',
//           drawerIcon: ({focused, size}) => (
//             <Image
//               source={require('./../assets/Icon/ic-order-on.svg')}
//               style={{}}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Staff"
//         component={HomeScreen}
//         options={{
//           drawerLabel: 'Staff',
//           // Section/Group Name
//           groupName: 'Proker',
//           activeTintColor: '#e91e63',
//           drawerIcon: ({focused, size}) => (
//             <Image
//               source={require('./../assets/Icon/ic-order-on.svg')}
//               style={{}}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Setting"
//         component={HomeScreen}
//         options={{
//           drawerLabel: 'Setting',
//           // Section/Group Name
//           activeTintColor: '#e91e63',
//           drawerIcon: ({focused, size}) => (
//             <Image
//               source={require('./../assets/Icon/ic-order-on.svg')}
//               style={{}}
//             />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Logout"
//         component={HomeScreen}
//         options={{
//           drawerLabel: 'Logout',
//           // Section/Group Name
//           activeTintColor: '#e91e63',
//           drawerIcon: ({focused, size}) => (
//             <Image
//               source={require('./../assets/Icon/ic-order-on.svg')}
//               style={{}}
//             />
//           ),
//         }}
//       />
//       {/* <Drawer.Screen name="Settings1" component={Settings1Screen} />
//       <Drawer.Screen name="Settings2" component={Settings2Screen} /> */}
//     </Drawer.Navigator>
//   );
// }
