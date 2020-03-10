import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL } from '../constants/Path';

async function init() {
  ACCESS_TOKEN = await AsyncStorage.getItem('access_token');
}

function getAxiosIntance() {
  const axiosInstance = axios.create({
    baseURL: `${API_URL}/customers`,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    }
  });
  return axiosInstance;
}

export async function createCustomer(data) {
  try {
    const response = await getAxiosIntance().post('', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.error : error.message;
  }
}

export async function updateCustomer(id, customer) {
  try {
    const data  = await getAxiosIntance().put(`/${id}`, customer);
    return data.data;
  } catch (error) {
    throw error.response ? error.response.data.error : error.message;
  }
}

export async function getCustomerByDocumentNumber(document_number) {
  try {
    const response = await getAxiosIntance().get('/search/term?q=' + document_number);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.error : error.message;
  }
}

init();