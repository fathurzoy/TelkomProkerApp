import api from '../context/ConnectionContext';

export const divisi_read = async () => {
  try {
    const result = await api('/divisi_read', {
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

export const divisi_delete = async id => {
  try {
    const result = await api(`/divisi_delete/${id}`, {
      method: 'DELETE',
      data: {id: id},
    });

    return result;
  } catch (error) {
    return error;
  }
};

export const divisi_create = async data => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/divisi_create', {
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

export const divisi_find = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/divisi_find', {
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

export const divisi_find_product = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/divisi_find', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        filter: {
          user_id: key.queryKey[1],
          product_id: key.queryKey[2],
        },
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const divisi_find_many = async key => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/divisi_find_many', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        filter: {
          user_id: key.queryKey,
        },
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const divisi_update = async (id, user_id, p_id, qty_item) => {
  try {
    const token = await localStorage.getItem('token_tel');
    const result = await api('/divisi_update', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        id: id,
        user_id: user_id,
        product_id: p_id,
        qty_item: qty_item,
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const divisi_find_many_product = async key => {
  try {
    const token = await sessionStorage.getItem('token_tel');
    const result = await api('/divisi_find_many', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      data: {
        filter: {
          user_id: key.queryKey[1],
          id: key.queryKey[2],
        },
      },
    });
    return result;
  } catch (error) {
    return error;
  }
};
