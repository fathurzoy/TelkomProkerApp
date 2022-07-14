/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  ToastAndroid,
  Image,
  Linking,
} from 'react-native';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
let url = 'https://telkom-frontend.vercel.app/proker-semua-export-pdf/?';

const ExcelExportProker = ({dataProker, title, status, filterMonth}) => {
  const [datax, setDatax] = useState();

  const dateNow = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (dataProker) {
      let temp = [];
      if (
        status === 'close' || 'semua'
          ? dataProker?.query?.map((e, i) => {
              temp.push({
                ID: i + 1,
                NAMA_PROGRAM: e.name,
                ACTION_PLAN: e.posisi,
                TARGET: e.gender,
                KETERANGAN: e.keterangan,
                BULAN: e.bulan,
                DIVISI: e.divisi.name,
                TANGGAL: new Date(e.updatedAt).toLocaleString('en-US', {
                  timeZone: 'Asia/Jakarta',
                }),
              });
            })
          : dataProker?.query?.map((e, i) => {
              temp.push({
                ID: i + 1,
                NAMA_PROGRAM: e.name,
                ACTION_PLAN: e.posisi,
                TARGET: e.gender,
                KETERANGAN: e.keterangan,
                BULAN: e.bulan,
                DIVISI: e.divisi.name,
              });
            })
      )
        setDatax(temp);
    }
  }, [dataProker]);
  // function to handle exporting
  const exportDataToExcel = () => {
    // Created Sample data
    let sample_data_to_export = datax;

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(sample_data_to_export);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});

    // Write generated excel to Storage
    RNFS.writeFile(
      RNFS.ExternalStorageDirectoryPath +
        `/Download/${title}_PROKER_${dateNow}.xlsx`,
      wbout,
      'ascii',
    )
      .then(r => {
        console.log('Success');
        alert(
          RNFS.ExternalStorageDirectoryPath +
            `/Download/${title}_PROKER_${dateNow}.xlsx`,
        );
      })
      .catch(e => {
        console.log('Error', e);
      });
  };
  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage permission needed',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          exportDataToExcel();
          console.log('Permission granted');
        } else {
          // Permission denied
          console.log('Permission denied');
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        exportDataToExcel();
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return;
    }
  };

  const handlePress = () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = Linking.canOpenURL(
      `${url}${status && `status=${status}`}&${
        filterMonth && `filterMonth=${filterMonth}`
      }`,
    );

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      Linking.openURL(
        `${url}${status && `status=${status}`}&${
          filterMonth && `filterMonth=${filterMonth}`
        }`,
      );
    } else {
      Alert.alert(
        `Don't know how to open this URL: ${url}${
          status && `status=${status}`
        }&${filterMonth && `filterMonth=${filterMonth}`}`,
      );
    }
  };

  return (
    <TouchableOpacity onPress={() => handlePress()}>
      <View>
        <Image
          source={require('./../../assets/Icon/logo_excel.png')}
          style={{width: 40, height: 40}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ExcelExportProker;
