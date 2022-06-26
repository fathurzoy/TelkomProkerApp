import Axios from 'axios';
import {setLoading} from '.';
import {API_HOST} from '../../config';
import {showMessage, storeData} from '../../utils';

export const signInAction = (form, navigation) => dispatch => {
  dispatch(setLoading(true));
  Axios.post(`${API_HOST.url}/admin_login`, form)
    .then(res => {
      if (res.data.success) {
        const token = `${res.data.token}`;

        dispatch(setLoading(false));

        storeData('token_tel', {value: token});
        storeData('username', {value: form.username});
        navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
        // console.log('success', res);
        dispatch(setLoading(false));
      } else {
        console.log('error', res);
        showMessage('Username atau Password Salah');
        dispatch(setLoading(false));
      }
    })
    .catch(err => {
      console.log('error', err);
      dispatch(setLoading(false));
      showMessage(err?.response?.data?.message);
    });
};
