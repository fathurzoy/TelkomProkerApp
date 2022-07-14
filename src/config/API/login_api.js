import Axios from 'axios';
import {API_HOST} from '.';
import {setLoading} from '../../redux/action';
import {showMessage} from '../../utils';

export const PostLogin = async data => {
  try {
    const result = await api('/admin_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    });
    return result;
  } catch (err) {
    return err;
  }
};

export const admin_read = async () => {
  const token = await localStorage.getItem('token_tel');
  try {
    const result = await api('/admin_read', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return result;
  } catch (error) {
    return error;
  }
};

export const admin_delete = async id => {
  const token = await localStorage.getItem('token_tel');
  try {
    const result = await api(`/admin_delete/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {id: id},
    });

    return result;
  } catch (error) {
    return error;
  }
};

export const admin_create = async data => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/admin_create', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const admin_find = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/admin_find', {
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

export const admin_find_many = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/admin_find_many', {
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

// export const admin_update = async (data) => {
//   try {
//     const token = await localStorage.getItem("token_tel");
//     const result = await api("/admin_update", {
//       method: "PUT",
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       data: data,
//     });
//     return result;
//   } catch (error) {
//     return error;
//   }
// };

export const admin_update = data => async dispatch => {
  try {
    dispatch(setLoading(true));

    const result = await Axios.put(
      `${API_HOST.url}/admin_update`,
      {
        id: data.id,
        password: data.password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${data.token}`,
        },
      },
    );
    console.log('success', result.data);
    showMessage('Berhasil Diupdate', 'success');
    // console.log('woy');
    // return result.data;
    dispatch(setLoading(false));
  } catch (error) {
    dispatch(setLoading(false));
    console.log('error', error);
  }
};
