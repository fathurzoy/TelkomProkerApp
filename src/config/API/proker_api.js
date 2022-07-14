import Axios from 'axios';
import {API_HOST} from '.';
import {setLoading} from '../../redux/action';
import {showMessage} from '../../utils';

export const proker_read = async () => {
  try {
    const result = await api('/proker_read', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return result;
  } catch (error) {
    return error;
  }
};

export const proker_delete = async id => {
  try {
    const result = await api(`/proker_delete/${id}`, {
      method: 'DELETE',
      data: {id: id},
    });

    return result;
  } catch (error) {
    return error;
  }
};

export const proker_create = data => async dispatch => {
  try {
    // console.log(data);
    dispatch(setLoading(true));

    const result = await Axios.post(`${API_HOST.url}/proker_create`, {
      nama_program: data.nama_program,
      plan: data.plan,
      target: data.target,
      bulan: data.bulan,
      divisi_id: data.divisi_id,
    });
    // console.log('success', result.data.success);
    if (result.data.success === false) {
      showMessage('Gagal Ditambah', 'error');
    } else {
      showMessage('Berhasil Ditambah', 'success');
    }
    // console.log('woy');
    // return result.data;
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.log('error', error);
  }
};

export const proker_find = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/proker_find', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        filter: {
          id: key.queryKey[1],
        },
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const proker_find_many = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/proker_find_many', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        filter: {
          divisi_id: key.queryKey[1],
        },
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const proker_find_many_status = async ({
  status,
  divisi_id,
  page,
  bulan,
  limit,
}) => {
  try {
    const result = await Axios.post(`${API_HOST.url}/proker_find_many`, {
      filter: {
        divisi_id: divisi_id,
        status: status,
        bulan: bulan,
      },
      page: page,
      limit: limit,
    });
    // console.log('success', result);
    // console.log('woy');
    return await result.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const proker_find_many_status_close = async ({
  status,
  divisi_id,
  page,
  bulan,
  limit,
}) => {
  try {
    const result = await Axios.post(`${API_HOST.url}/proker_find_many`, {
      filter: {
        divisi_id: divisi_id,
        status: status,
        bulan: bulan,
      },
      page: page,
      limit: limit,
    });
    // console.log('success', result);
    // console.log('woy');
    return await result.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const proker_find_many_status_all = async ({
  status,
  divisi_id,
  page,
  bulan,
  limit,
}) => {
  try {
    const result = await Axios.post(`${API_HOST.url}/proker_find_many`, {
      filter: {
        divisi_id: divisi_id,
        status: status,
        bulan: bulan,
      },
      page: page,
      limit: limit,
    });
    // console.log('success', result.data);
    // console.log('woy');
    return await result.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const proker_find_many_status_month = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/proker_find_many', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        filter: {
          divisi_id: key.queryKey[1],
          status: key.queryKey[2],
          bulan: key.queryKey[3],
        },
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const proker_find_many_status_only = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/proker_find_many', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        filter: {
          status: key.queryKey[1],
        },
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const proker_find_many_status_month_only = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/proker_find_many', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        filter: {
          status: key.queryKey[1],
          bulan: key.queryKey[2],
        },
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const proker_update = data => async dispatch => {
  try {
    dispatch(setLoading(true));

    const result = await Axios.put(`${API_HOST.url}/proker_update`, data);
    // console.log('success', result);
    showMessage('Berhasil Diupdate', 'success');
    // console.log('woy');
    // return result.data;
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.log('error', error);
  }
};

export const proker_close =
  ({id, status, keterangan}) =>
  async dispatch => {
    try {
      dispatch(setLoading(true));

      const result = await Axios.put(`${API_HOST.url}/proker_update`, {
        id: id,
        status: status,
        keterangan: keterangan,
      });
      // console.log('success', result);
      showMessage('Berhasil Diupdate', 'success');
      // console.log('woy');
      // return result.data;
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log('error', error);
    }
  };
