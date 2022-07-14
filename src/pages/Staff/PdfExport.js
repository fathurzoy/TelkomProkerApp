// Example to Make PDF in React Native from HTML Text
// https://aboutreact.com/make-pdf-in-react-native-from-html-text/

// Import React
import React, {useEffect, useState} from 'react';
// Import required components
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Linking,
} from 'react-native';

let url = 'https://telkom-frontend.vercel.app/staff-export-pdf/?';

// Import HTML to PDF
import RNHTMLtoPDF from 'react-native-html-to-pdf';
const PdfExport = ({dataStaff, title, divisi_id}) => {
  const [htmldata, setHtmldata] = useState('');
  const [kocak, setKocak] = useState('ok');
  const [filePath, setFilePath] = useState('');
  const dateNow = new Date().toISOString().slice(0, 10);

  const isPermitted = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs access to Storage data',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        alert('Write permission err', err);
        return false;
      }
    } else {
      return true;
    }
  };

  const createPDF = async () => {
    console.log(dataStaff.query);

    const htmldata = `<table
    class="table table-striped"
    style="margin: 20px; height: auto"
    cellspacing="0"
    border="0"
  >
    <colgroup width="100"></colgroup>
    <colgroup width="280"></colgroup>
    <colgroup width="741"></colgroup>
    <colgroup width="181"></colgroup>
    <colgroup width="139"></colgroup>
    <colgroup width="67"></colgroup>
    <tr>
      <td colspan="3" height="24" align="left">
        <font size="4">Staff Divisi ${dateNow}</font>
      </td>
      <td align="left"></td>
      <td align="left"></td>
      <td align="left"></td>
      <td align="left"></td>
    </tr>
    <tr>
      <td colspan="3" height="24" align="left">
        <font size="4">UNIT: NETWORK AREA IS OPERATION</font>
      </td>
      <td align="left"></td>
      <td align="left"></td>
      <td align="left"></td>
      <td align="left"></td>
    </tr>
    <tr>
      <td colspan="3" height="24" align="left">
        <font size="4">DIVISI ${title}</font>
        </td>
        <td align="left"></td>
        <td align="left"></td>
        <td align="left"></td>
        <td align="left"></td>
      </tr>
      <tr>
        <td colspan="2" height="24" align="left">
          <font size="4">WITEL JAKARTA PUSAT</font>
        </td>
        <td align="left"></td>
        <td align="left"></td>
        <td align="left"></td>
        <td align="left"></td>
      </tr>
      <tr><td></td></tr>
      <tr>
        <td
          style="
            border: 0.5pt solid #000000;
            vertical-align: middle;
            text-align: center;
          "
          rowspan="2"
          height="34"
          align="center"
          valign="middle"
          bgcolor="#808080"
        >
          <b><font face="Calibri" color="#FFFFFF">NIK</font></b>
        </td>
        <td
          style="
            border: 0.5pt solid #000000;
            vertical-align: middle;
            text-align: center;
          "
          rowspan="2"
          align="center"
          valign="middle"
          bgcolor="#808080"
        >
          <b>
            <font face="Calibri" color="#FFFFFF">NAMA</font>
          </b>
        </td>
        <td
          style="
            border: 0.5pt solid #000000;
            vertical-align: middle;
            text-align: center;
          "
          rowspan="2"
          align="center"
          valign="middle"
          bgcolor="#808080"
        >
          <b>
            <font face="Calibri" color="#FFFFFF">DIVISI</font>
          </b>
        </td>
        <td
          style="
            border: 0.5pt solid #000000;
            vertical-align: middle;
            text-align: center;
          "
          rowspan="2"
          align="center"
          valign="middle"
          bgcolor="#808080"
        >
          <b>
            <font face="Calibri" color="#FFFFFF">POSISI</font>
          </b>
        </td>
        <td
          style="
            border: 0.5pt solid #000000;
            vertical-align: middle;
            text-align: center;
          "
          rowspan="2"
          align="center"
          valign="middle"
          bgcolor="#808080"
        >
          <b>
            <font face="Calibri" color="#FFFFFF">
              JENIS KELAMIN
            </font>
          </b>
        </td>
        <td align="left"></td>
      </tr>
      <tr>
        <td align="left"><br /></td>
      </tr>
      <tr>
        <td
          style="border: 0.5pt solid #000000; padding: 5px"
          height="20"
          align="center"
          valign="middle"
        >
          <b>
            <font face="Calibri" color="#FFFFFF"><br /></font>
          </b>
        </td>
        <td
          style="border: 0.5pt solid #000000; padding: 5px"
          align="center"
          valign="middle"
        >
          <b>
            <font face="Calibri" color="#FFFFFF"><br /></font>
          </b>
        </td>
        <td
          style="border: 0.5pt solid #000000; padding: 5px"
          align="center"
          valign="middle"
        >
          <b>
            <font face="Calibri" color="#FFFFFF"><br /></font>
          </b>
        </td>
        <td
          style="border: 0.5pt solid #000000; padding: 5px"
          align="center"
          valign="middle"
        >
          <b>
            <font face="Calibri" color="#FFFFFF"><br /></font>
          </b>
        </td>
        <td
          style="border: 0.5pt solid #000000; padding: 5px"
          align="center"
          valign="middle"
        >
          <b>
            <font face="Calibri" color="#FFFFFF"><br /></font>
          </b>
        </td>
        <td align="left"><br /></td>
      </tr>
      <tr>
        <td
          style="border: 0.5pt solid #000000; padding: 5px"
          height="17"
          align="center"
        >
          <b>I</b>
        </td>
        <td
          style="border: 0.5pt solid #000000; padding: 5px"
          align="left"
          valign="middle"
        >
          <b>${title}</b>
        </td>
        <td
          style="border: 0.5pt solid #000000; padding: 5px"
          align="center"
          valign="middle"
        >
          <b><br /></b>
        </td>
        <td
          style="border: 0.5pt solid #000000; padding: 5px"
          align="center"
          valign="middle"
        >
          <b><br /></b>
        </td>
        <td
          style="border: 0.5pt solid #000000; padding: 5px"
          align="left"
          valign="middle"
        >
          <b><br /></b>
        </td>
        <td align="left"><br /></td>
      </tr>
    <tbody>
    <td align="left">
    ${dataStaff?.query?.map(
      (e, i) =>
        ` <tr>
            <td
              style="border: 0.5pt solid #000000; padding: 5px"
              height="17"
              align="center"
              sdval="1"
              sdnum="1033;">
              ${e.nik}
            </td>
            <td
              style="border: 0.5pt solid #000000; padding: 5px"
              align="left">
              ${e.name}
            </td>
            <td
              style="border: 0.5pt solid #000000; padding: 5px"
              align="left"
              valign="top"
              bgcolor="#FFFFFF">
              ${e.divisi.name}
            </td>
            <td
              style="border: 0.5pt solid #000000; padding: 5px"
              align="left">
              ${e.posisi}
            </td>
            <td
              style="border: 0.5pt solid #000000; padding: 5px"
              align="left">
              ${e.gender}
            </td>
            <td align="left">
              <br />
            </td>
          </tr>`,
    )}
      </td>
    </tbody>
    </table>`;

    console.log(htmldata);

    if (await isPermitted()) {
      let options = {
        //Content to print
        html: htmldata,
        //File Name
        fileName: `${title}_STAFF-${dateNow}`,
        directory: 'Documents',
      };
      let file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
      setFilePath(file.filePath);
      alert(file.filePath);
    }
  };

  const handlePress = () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = Linking.canOpenURL(
      `${url}${title && `title=${title}`}&${
        divisi_id && `divisi_id=${divisi_id}`
      }`,
    );

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      Linking.openURL(
        `${url}${title && `title=${title}`}&${
          divisi_id && `divisi_id=${divisi_id}`
        }`,
      );
    } else {
      Alert.alert(
        `Don't know how to open this URL: ${url}${title && `title=${title}`}&${
          divisi_id && `divisi_id=${divisi_id}`
        }`,
      );
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <View>
          <Image
            source={require('./../../assets/Icon/logo_pdf.png')}
            style={{width: 40, height: 40}}
          />
        </View>
      </TouchableOpacity>
    </>
  );
};

export default PdfExport;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  textStyle: {
    fontSize: 18,
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  imageStyle: {
    width: 150,
    height: 150,
    margin: 5,
    resizeMode: 'stretch',
  },
});
