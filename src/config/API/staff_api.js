import Axios from 'axios';
import {API_HOST} from '.';
import {setLoading} from '../../redux/action';
import {showMessage} from '../../utils';

export const staff_read = async (page, limit) => {
  try {
    const result = await Axios.post(`${API_HOST.url}/staff_read`, {
      page: page,
      limit: limit,
    });
    // console.log('success', result.data);
    // console.log('woy');
    return result.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const staff_delete = async id => {
  try {
    const result = await Axios.delete(`${API_HOST.url}/staff_delete/${id}`, {
      id: id,
    });
    console.log('success', result);
    // console.log('woy');
    return result.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const staff_create = data => async dispatch => {
  try {
    console.log(data);
    dispatch(setLoading(true));

    const result = await Axios.post(`${API_HOST.url}/staff_create`, {
      nik: data.nik,
      name: data.name,
      posisi: data.posisi,
      gender: data.gender,
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

export const staff_find = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/staff_find', {
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

export const staff_find_many = async ({page, limit, divisi_id}) => {
  try {
    const result = await Axios.post(`${API_HOST.url}/staff_find_many`, {
      filter: {
        divisi_id: divisi_id,
      },
      page: page,
      limit: limit,
    });
    // console.log('success', divisi_id);
    // console.log('woy');
    return await result.data;
  } catch (error) {
    console.log('error', error);
  }
};
export const staff_find_many_transport = async ({page, limit}) => {
  try {
    const result = await Axios.post(`${API_HOST.url}/staff_find_many`, {
      filter: {
        divisi_id: 2,
      },
      page: page,
      limit: limit,
    });
    // console.log('success', divisi_id);
    // console.log('woy');
    return await result.data;
  } catch (error) {
    console.log('error', error);
  }
};
export const staff_find_many_ipn = async ({page, limit}) => {
  try {
    const result = await Axios.post(`${API_HOST.url}/staff_find_many`, {
      filter: {
        divisi_id: 3,
      },
      page: page,
      limit: limit,
    });
    // console.log('success', divisi_id);
    // console.log('woy');
    return await result.data;
  } catch (error) {
    console.log('error', error);
  }
};
export const staff_find_many_admin = async ({page, limit}) => {
  try {
    const result = await Axios.post(`${API_HOST.url}/staff_find_many`, {
      filter: {
        divisi_id: 4,
      },
      page: page,
      limit: limit,
    });
    // console.log('success', divisi_id);
    // console.log('woy');
    return await result.data;
  } catch (error) {
    console.log('error', error);
  }
};
export const staff_find_many_is = async ({page, limit}) => {
  try {
    const result = await Axios.post(`${API_HOST.url}/staff_find_many`, {
      filter: {
        divisi_id: 5,
      },
      page: page,
      limit: limit,
    });
    // console.log('success', divisi_id);
    // console.log('woy');
    return await result.data;
  } catch (error) {
    console.log('error', error);
  }
};

export const staff_find_many_status = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/staff_find_many', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        filter: {
          divisi_id: key.queryKey[1],
          status: key.queryKey[2],
        },
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const staff_find_many_status_only = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/staff_find_many', {
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

export const staff_update = data => async dispatch => {
  try {
    dispatch(setLoading(true));

    const result = await Axios.put(`${API_HOST.url}/staff_update`, data);
    console.log('success', result);
    showMessage('Berhasil Diupdate', 'success');
    // console.log('woy');
    // return result.data;
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.log('error', error);
  }
};
