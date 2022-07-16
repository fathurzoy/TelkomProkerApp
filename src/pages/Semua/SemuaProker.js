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
  proker_find_many_status_all,
  proker_update,
} from '../../config/API/proker_api';
import SelectBulan from '../../components/atom/Select/SelectBulan';
import ExcelExportProker from './ExcelExportProker';
import PdfExportProker from './PdfExportProker';

const SemuaProker = ({akses}) => {
  const [prokerListManyCme, setProkerListManyCme] = useState([]);
  const [prokerListLimitCme, setProkerListLimitCme] = useState([]);
  const [prokerListManyTransport, setProkerListManyTransport] = useState([]);
  const [prokerListLimitTransport, setProkerListLimitTransport] = useState([]);
  const [prokerListManyIpn, setProkerListManyIpn] = useState([]);
  const [prokerListLimitIpn, setProkerListLimitIpn] = useState([]);
  const [prokerListManyAdmin, setProkerListManyAdmin] = useState([]);
  const [prokerListLimitAdmin, setProkerListLimitAdmin] = useState([]);
  const [prokerListManyIs, setProkerListManyIs] = useState([]);
  const [prokerListLimitIs, setProkerListLimitIs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [staffClick, setStaffClick] = useState();
  const [page, setPage] = useState(1);
  const [pageTransport, setPageTransport] = useState(1);
  const [pageIpn, setPageIpn] = useState(1);
  const [pageAdmin, setPageAdmin] = useState(1);
  const [pageIs, setPageIs] = useState(1);
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
        Tanggal
      </Text>,
    ],
  });

  const {isLoading} = useSelector(state => state.globalReducer);

  const getProkerfListCme = async () => {
    let divisi_id = 1;
    let datas = await proker_find_many_status_all({
      page,
      divisi_id,
    });
    setProkerListManyCme(datas);
  };

  const getProkerfListCmeBulan = async () => {
    let divisi_id = 1;
    let datas = await proker_find_many_status_all({
      page,
      divisi_id,

      bulan: filterMonth,
    });
    setProkerListManyCme(datas);
  };
  const getProkerfListCmeLimit = async () => {
    let divisi_id = 1;
    let limit = null;
    let datas = await proker_find_many_status_all({
      page,
      limit,
      divisi_id,
    });
    setProkerListLimitCme(datas);
  };
  const getProkerfListCmeLimitBulan = async () => {
    let divisi_id = 1;
    let limit = null;
    let datas = await proker_find_many_status_all({
      page,
      limit,
      divisi_id,

      bulan: filterMonth,
    });
    setProkerListLimitCme(datas);
  };
  // =======================================
  const getProkerfListTransport = async () => {
    let divisi_id = 2;
    let datas = await proker_find_many_status_all({
      page: pageTransport,
      divisi_id,
    });
    setProkerListManyTransport(datas);
  };

  const getProkerfListTransportBulan = async () => {
    let divisi_id = 2;
    let datas = await proker_find_many_status_all({
      page: pageTransport,
      divisi_id,

      bulan: filterMonth,
    });
    setProkerListManyTransport(datas);
  };
  const getProkerfListTransportLimit = async () => {
    let divisi_id = 2;
    let limit = null;
    let datas = await proker_find_many_status_all({
      page: pageTransport,
      limit,
      divisi_id,
    });
    setProkerListLimitTransport(datas);
  };
  const getProkerfListTransportLimitBulan = async () => {
    let divisi_id = 2;
    let limit = null;
    let datas = await proker_find_many_status_all({
      page: pageTransport,
      limit,
      divisi_id,

      bulan: filterMonth,
    });
    setProkerListLimitTransport(datas);
  };
  // =======================================
  const getProkerfListIpn = async () => {
    let divisi_id = 3;
    let datas = await proker_find_many_status_all({
      page: pageIpn,
      divisi_id,
    });
    setProkerListManyIpn(datas);
  };

  const getProkerfListIpnBulan = async () => {
    let divisi_id = 3;
    let datas = await proker_find_many_status_all({
      page: pageIpn,
      divisi_id,

      bulan: filterMonth,
    });
    setProkerListManyIpn(datas);
  };
  const getProkerfListIpnLimit = async () => {
    let divisi_id = 3;
    let limit = null;
    let datas = await proker_find_many_status_all({
      page: pageIpn,
      limit,
      divisi_id,
    });
    setProkerListLimitIpn(datas);
  };
  const getProkerfListIpnLimitBulan = async () => {
    let divisi_id = 3;
    let limit = null;
    let datas = await proker_find_many_status_all({
      page: pageIpn,
      limit,
      divisi_id,

      bulan: filterMonth,
    });
    setProkerListLimitIpn(datas);
  };
  // =======================================
  const getProkerfListAdmin = async () => {
    let divisi_id = 4;
    let datas = await proker_find_many_status_all({
      page: pageAdmin,
      divisi_id,
    });
    setProkerListManyAdmin(datas);
  };

  const getProkerfListAdminBulan = async () => {
    let divisi_id = 4;
    let datas = await proker_find_many_status_all({
      page: pageAdmin,
      divisi_id,

      bulan: filterMonth,
    });
    setProkerListManyAdmin(datas);
  };
  const getProkerfListAdminLimit = async () => {
    let divisi_id = 4;
    let limit = null;
    let datas = await proker_find_many_status_all({
      page: pageAdmin,
      limit,
      divisi_id,
    });
    setProkerListLimitAdmin(datas);
  };
  const getProkerfListAdminLimitBulan = async () => {
    let divisi_id = 4;
    let limit = null;
    let datas = await proker_find_many_status_all({
      page: pageAdmin,
      limit,
      divisi_id,

      bulan: filterMonth,
    });
    setProkerListLimitAdmin(datas);
  };
  // =======================================
  const getProkerfListIs = async () => {
    let divisi_id = 5;
    let datas = await proker_find_many_status_all({
      page: pageIs,
      divisi_id,
    });
    setProkerListManyIs(datas);
  };

  const getProkerfListIsBulan = async () => {
    let divisi_id = 5;
    let datas = await proker_find_many_status_all({
      page: pageIs,
      divisi_id,

      bulan: filterMonth,
    });
    setProkerListManyIs(datas);
  };
  const getProkerfListIsLimit = async () => {
    let divisi_id = 5;
    let limit = null;
    let datas = await proker_find_many_status_all({
      page: pageIs,
      limit,
      divisi_id,
    });
    setProkerListLimitIs(datas);
  };
  const getProkerfListIsLimitBulan = async () => {
    let divisi_id = 5;
    let limit = null;
    let datas = await proker_find_many_status_all({
      page: pageIs,
      limit,
      divisi_id,

      bulan: filterMonth,
    });
    setProkerListLimitIs(datas);
  };

  useEffect(() => {
    if (filterMonth === null) {
      getProkerfListCme();
      getProkerfListTransport();
      getProkerfListIpn();
      getProkerfListAdmin();
      getProkerfListIs();
    } else {
      getProkerfListCmeBulan();
      getProkerfListTransportBulan();
      getProkerfListIpnBulan();
      getProkerfListAdminBulan();
      getProkerfListIsBulan();
    }
    // if (filterMonth === null) {
    //   getProkerfListCmeLimit();
    //   getProkerfListTransportLimit();
    //   getProkerfListIpnLimit();
    //   getProkerfListAdminLimit();
    //   getProkerfListIsLimit();
    // } else {
    //   getProkerfListCmeLimitBulan();
    //   getProkerfListTransportLimitBulan();
    //   getProkerfListIpnLimitBulan();
    //   getProkerfListAdminLimitBulan();
    //   getProkerfListIsLimitBulan();
    // }
  }, [page, pageTransport, pageIpn, pageAdmin, pageIs, isLoading, filterMonth]);

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
      <View style={{height: 670}}>
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
              dataProker={prokerListLimitCme}
              title={'SEMUA'}
              status={'semua'}
              filterMonth={filterMonth}
            />
            <Gap width={10} />
            <PdfExportProker
              dataProker={prokerListLimitCme}
              title={'SEMUA'}
              status={'semua'}
              filterMonth={filterMonth}
            />
          </View>
        </View>

        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 24}}>Proker CME</Text>

          <ScrollView horizontal={true}>
            <View>
              <Table>
                <Row
                  data={state.tableHead}
                  style={styles.head}
                  textStyle={styles.textWhite}
                />

                {akses ? (
                  Object.keys(prokerListManyCme).length > 0 ? (
                    prokerListManyCme?.query?.map((rowData, index) => {
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
                                <Text>
                                  {new Date(rowData.updatedAt).toLocaleString(
                                    'en-US',
                                    {
                                      timeZone: 'Asia/Jakarta',
                                    },
                                  )}
                                </Text>
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
                ) : Object.keys(prokerListManyCme).length > 0 ? (
                  prokerListManyCme?.query?.map((rowData, index) => {
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
                              <Text>
                                {new Date(rowData.updatedAt).toLocaleString(
                                  'en-US',
                                  {
                                    timeZone: 'Asia/Jakarta',
                                  },
                                )}
                              </Text>
                            </View>
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
          {Object.keys(prokerListManyCme)?.length > 0 && (
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>
                Page {prokerListManyCme?.current_page} of{' '}
                {prokerListManyCme?.total_page}
              </Text>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setPage(prokerListManyCme?.current_page - 1);
                  }}
                  disabled={prokerListManyCme.current_page <= 1}>
                  <AngleLeft />
                </TouchableOpacity>
                <Text style={{paddingHorizontal: 10}}>
                  {prokerListManyCme?.current_page}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setPage(prokerListManyCme?.current_page + 1);
                  }}
                  disabled={
                    prokerListManyCme.current_page >=
                    prokerListManyCme.total_page
                  }>
                  <AngleRight />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 24}}>Proker Transport</Text>

          <ScrollView horizontal={true}>
            <View>
              <Table>
                <Row
                  data={state.tableHead}
                  style={styles.head}
                  textStyle={styles.textWhite}
                />

                {akses ? (
                  Object.keys(prokerListManyTransport).length > 0 ? (
                    prokerListManyTransport?.query?.map((rowData, index) => {
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
                                {pageTransport * 10 - 10 + index + 1}
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
                                <Text>
                                  {new Date(rowData.updatedAt).toLocaleString(
                                    'en-US',
                                    {
                                      timeZone: 'Asia/Jakarta',
                                    },
                                  )}
                                </Text>
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
                ) : Object.keys(prokerListManyTransport).length > 0 ? (
                  prokerListManyTransport?.query?.map((rowData, index) => {
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
                              {pageTransport * 10 - 10 + index + 1}
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
                              <Text>
                                {new Date(rowData.updatedAt).toLocaleString(
                                  'en-US',
                                  {
                                    timeZone: 'Asia/Jakarta',
                                  },
                                )}
                              </Text>
                            </View>
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
          {Object.keys(prokerListManyTransport)?.length > 0 && (
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>
                Page {prokerListManyTransport?.current_page} of{' '}
                {prokerListManyTransport?.total_page}
              </Text>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setPageTransport(prokerListManyTransport?.current_page - 1);
                  }}
                  disabled={prokerListManyTransport.current_page <= 1}>
                  <AngleLeft />
                </TouchableOpacity>
                <Text style={{paddingHorizontal: 10}}>
                  {prokerListManyTransport?.current_page}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setPageTransport(prokerListManyTransport?.current_page + 1);
                  }}
                  disabled={
                    prokerListManyTransport.current_page >=
                    prokerListManyTransport.total_page
                  }>
                  <AngleRight />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 24}}>Proker Ipn</Text>

          <ScrollView horizontal={true}>
            <View>
              <Table>
                <Row
                  data={state.tableHead}
                  style={styles.head}
                  textStyle={styles.textWhite}
                />

                {akses ? (
                  Object.keys(prokerListManyIpn).length > 0 ? (
                    prokerListManyIpn?.query?.map((rowData, index) => {
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
                                {pageIpn * 10 - 10 + index + 1}
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
                                <Text>
                                  {new Date(rowData.updatedAt).toLocaleString(
                                    'en-US',
                                    {
                                      timeZone: 'Asia/Jakarta',
                                    },
                                  )}
                                </Text>
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
                ) : Object.keys(prokerListManyIpn).length > 0 ? (
                  prokerListManyIpn?.query?.map((rowData, index) => {
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
                              {pageIpn * 10 - 10 + index + 1}
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
                              <Text>
                                {new Date(rowData.updatedAt).toLocaleString(
                                  'en-US',
                                  {
                                    timeZone: 'Asia/Jakarta',
                                  },
                                )}
                              </Text>
                            </View>
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
          {Object.keys(prokerListManyIpn)?.length > 0 && (
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>
                Page {prokerListManyIpn?.current_page} of{' '}
                {prokerListManyIpn?.total_page}
              </Text>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setPageIpn(prokerListManyIpn?.current_page - 1);
                  }}
                  disabled={prokerListManyIpn.current_page <= 1}>
                  <AngleLeft />
                </TouchableOpacity>
                <Text style={{paddingHorizontal: 10}}>
                  {prokerListManyIpn?.current_page}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setPageIpn(prokerListManyIpn?.current_page + 1);
                  }}
                  disabled={
                    prokerListManyIpn.current_page >=
                    prokerListManyIpn.total_page
                  }>
                  <AngleRight />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 24}}>Proker Admin</Text>

          <ScrollView horizontal={true}>
            <View>
              <Table>
                <Row
                  data={state.tableHead}
                  style={styles.head}
                  textStyle={styles.textWhite}
                />

                {akses ? (
                  Object.keys(prokerListManyAdmin).length > 0 ? (
                    prokerListManyAdmin?.query?.map((rowData, index) => {
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
                                {pageAdmin * 10 - 10 + index + 1}
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
                                <Text>
                                  {new Date(rowData.updatedAt).toLocaleString(
                                    'en-US',
                                    {
                                      timeZone: 'Asia/Jakarta',
                                    },
                                  )}
                                </Text>
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
                ) : Object.keys(prokerListManyAdmin).length > 0 ? (
                  prokerListManyAdmin?.query?.map((rowData, index) => {
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
                              {pageAdmin * 10 - 10 + index + 1}
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
                              <Text>
                                {new Date(rowData.updatedAt).toLocaleString(
                                  'en-US',
                                  {
                                    timeZone: 'Asia/Jakarta',
                                  },
                                )}
                              </Text>
                            </View>
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
          {Object.keys(prokerListManyAdmin)?.length > 0 && (
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>
                Page {prokerListManyAdmin?.current_page} of{' '}
                {prokerListManyAdmin?.total_page}
              </Text>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setPageAdmin(prokerListManyAdmin?.current_page - 1);
                  }}
                  disabled={prokerListManyAdmin.current_page <= 1}>
                  <AngleLeft />
                </TouchableOpacity>
                <Text style={{paddingHorizontal: 10}}>
                  {prokerListManyAdmin?.current_page}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setPageAdmin(prokerListManyAdmin?.current_page + 1);
                  }}
                  disabled={
                    prokerListManyAdmin.current_page >=
                    prokerListManyAdmin.total_page
                  }>
                  <AngleRight />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        <View style={{marginBottom: 20}}>
          <Text style={{fontSize: 24}}>Proker Is</Text>

          <ScrollView horizontal={true}>
            <View>
              <Table>
                <Row
                  data={state.tableHead}
                  style={styles.head}
                  textStyle={styles.textWhite}
                />

                {akses ? (
                  Object.keys(prokerListManyIs).length > 0 ? (
                    prokerListManyIs?.query?.map((rowData, index) => {
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
                                {pageIs * 10 - 10 + index + 1}
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
                                <Text>
                                  {new Date(rowData.updatedAt).toLocaleString(
                                    'en-US',
                                    {
                                      timeZone: 'Asia/Jakarta',
                                    },
                                  )}
                                </Text>
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
                ) : Object.keys(prokerListManyIs).length > 0 ? (
                  prokerListManyIs?.query?.map((rowData, index) => {
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
                              {pageIs * 10 - 10 + index + 1}
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
                              <Text>
                                {new Date(rowData.updatedAt).toLocaleString(
                                  'en-US',
                                  {
                                    timeZone: 'Asia/Jakarta',
                                  },
                                )}
                              </Text>
                            </View>
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
          {Object.keys(prokerListManyIs)?.length > 0 && (
            <View
              style={{
                marginTop: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text>
                Page {prokerListManyIs?.current_page} of{' '}
                {prokerListManyIs?.total_page}
              </Text>
              <View
                style={{
                  marginLeft: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setPageIs(prokerListManyIs?.current_page - 1);
                  }}
                  disabled={prokerListManyIs.current_page <= 1}>
                  <AngleLeft />
                </TouchableOpacity>
                <Text style={{paddingHorizontal: 10}}>
                  {prokerListManyIs?.current_page}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setPageIs(prokerListManyIs?.current_page + 1);
                  }}
                  disabled={
                    prokerListManyIs.current_page >= prokerListManyIs.total_page
                  }>
                  <AngleRight />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

export default SemuaProker;

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
    divisi_id: 1,
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
        divisi_id: 1,
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
            <Text style={{marginBottom: 10}}>TAMBAH STAFF</Text>
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

// const ProkerListTable = ({prokerListMany, akses, page}) => {
//   return (
//     <>
//       {akses ? (
//         Object.keys(prokerListMany).length > 0 ? (
//           prokerListMany?.query?.map((rowData, index) => {
//             return (
//               <TableWrapper key={index} style={styles.row}>
//                 <Cell
//                   style={{
//                     borderWidth: 1,
//                     borderColor: '#000',
//                     borderStyle: 'solid',
//                   }}
//                   data={
//                     <Text
//                       style={{
//                         paddingLeft: 10,
//                         paddingLeft: 5,
//                         paddingRight: 5,
//                         width: 50,
//                         color: 'black',
//                         paddingVertical: 15,
//                       }}>
//                       {page * 10 - 10 + index + 1}
//                     </Text>
//                   }
//                   textStyle={styles.text}
//                 />
//                 <Cell
//                   style={{
//                     borderWidth: 1,
//                     borderColor: '#000',
//                     borderStyle: 'solid',
//                   }}
//                   data={
//                     <Text
//                       style={{
//                         paddingLeft: 5,
//                         paddingRight: 5,
//                         width: 120,
//                         color: 'black',
//                       }}>
//                       {rowData.nama_program}
//                     </Text>
//                   }
//                   textStyle={styles.text}
//                 />
//                 <Cell
//                   style={{
//                     borderWidth: 1,
//                     borderColor: '#000',
//                     borderStyle: 'solid',
//                   }}
//                   data={
//                     <Text
//                       style={{
//                         paddingLeft: 5,
//                         paddingRight: 5,
//                         paddingVertical: 5,
//                         width: 350,
//                         color: 'black',
//                       }}>
//                       {rowData.plan}
//                     </Text>
//                   }
//                   textStyle={styles.text}
//                 />
//                 <Cell
//                   style={{
//                     borderWidth: 1,
//                     borderColor: '#000',
//                     borderStyle: 'solid',
//                   }}
//                   data={
//                     <Text
//                       style={{
//                         paddingLeft: 5,
//                         paddingRight: 5,
//                         width: 100,
//                         color: 'black',
//                       }}>
//                       {rowData.target}
//                     </Text>
//                   }
//                   textStyle={styles.text}
//                 />
//                 <Cell
//                   style={{
//                     borderWidth: 1,
//                     borderColor: '#000',
//                     borderStyle: 'solid',
//                   }}
//                   data={
//                     <Text
//                       style={{
//                         paddingLeft: 5,
//                         paddingRight: 5,
//                         width: 120,
//                         color: 'black',
//                       }}>
//                       {rowData.keterangan}
//                     </Text>
//                   }
//                   textStyle={styles.text}
//                 />
//                 <Cell
//                   style={{
//                     borderWidth: 1,
//                     borderColor: '#000',
//                     borderStyle: 'solid',
//                   }}
//                   data={
//                     <Text
//                       style={{
//                         paddingLeft: 5,
//                         paddingRight: 5,
//                         width: 120,
//                         color: 'black',
//                       }}>
//                       {rowData.bulan}
//                     </Text>
//                   }
//                   textStyle={styles.text}
//                 />
//                 <Cell
//                   style={{
//                     borderWidth: 1,
//                     borderColor: '#000',
//                     borderStyle: 'solid',
//                   }}
//                   data={
//                     <View
//                       style={{
//                         flexDirection: 'row',
//                         width: 120,
//                         flex: 1,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         borderRightWidth: 1,
//                         borderRightColor: '#000',
//                       }}>
//                       <TouchableOpacity
//                         onPress={() => {
//                           setStaffClick(rowData);
//                           setModalVisible(true);
//                         }}>
//                         <IconEdit />
//                       </TouchableOpacity>
//                       <Gap width={10} />
//                       <TouchableOpacity
//                         onPress={() =>
//                           closeConfirm({
//                             id: rowData.id,
//                             status: 'request',
//                             keterangan: 'request',
//                           })
//                         }>
//                         <IconClose />
//                       </TouchableOpacity>
//                     </View>
//                   }
//                   textStyle={styles.text}
//                 />
//               </TableWrapper>
//             );
//           })
//         ) : (
//           <Text>Loading</Text>
//         )
//       ) : Object.keys(prokerListMany).length > 0 ? (
//         prokerListMany?.query?.map((rowData, index) => {
//           return (
//             <TableWrapper key={index} style={styles.row}>
//               <Cell
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#000',
//                   borderStyle: 'solid',
//                 }}
//                 data={
//                   <Text
//                     style={{
//                       paddingLeft: 10,
//                       paddingLeft: 5,
//                       paddingRight: 5,
//                       width: 80,
//                       color: 'black',
//                       paddingVertical: 15,
//                     }}>
//                     {index + 1}
//                   </Text>
//                 }
//                 textStyle={styles.text}
//               />
//               <Cell
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#000',
//                   borderStyle: 'solid',
//                 }}
//                 data={
//                   <Text
//                     style={{
//                       paddingLeft: 5,
//                       paddingRight: 5,
//                       width: 120,
//                       color: 'black',
//                     }}>
//                     {rowData.nama_program}
//                   </Text>
//                 }
//                 textStyle={styles.text}
//               />
//               <Cell
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#000',
//                   borderStyle: 'solid',
//                 }}
//                 data={
//                   <Text
//                     style={{
//                       paddingLeft: 5,
//                       paddingRight: 5,
//                       width: 110,
//                       color: 'black',
//                     }}>
//                     {rowData.plan}
//                   </Text>
//                 }
//                 textStyle={styles.text}
//               />
//               <Cell
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#000',
//                   borderStyle: 'solid',
//                 }}
//                 data={
//                   <Text
//                     style={{
//                       paddingLeft: 5,
//                       paddingRight: 5,
//                       width: 100,
//                       color: 'black',
//                     }}>
//                     {rowData.target}
//                   </Text>
//                 }
//                 textStyle={styles.text}
//               />
//               <Cell
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#000',
//                   borderStyle: 'solid',
//                 }}
//                 data={
//                   <Text
//                     style={{
//                       paddingLeft: 5,
//                       paddingRight: 5,
//                       width: 100,
//                       color: 'black',
//                     }}>
//                     {rowData.keterangan}
//                   </Text>
//                 }
//                 textStyle={styles.text}
//               />
//               <Cell
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#000',
//                   borderRightWidth: 1,
//                   borderStyle: 'solid',
//                 }}
//                 data={
//                   <Text
//                     style={{
//                       paddingLeft: 5,
//                       paddingRight: 5,
//                       width: 120,
//                       color: 'black',
//                     }}>
//                     {rowData.bulan}
//                   </Text>
//                 }
//                 textStyle={styles.text}
//               />
//             </TableWrapper>
//           );
//         })
//       ) : (
//         <Text>Loading</Text>
//       )}
//     </>
//   );
// };

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
