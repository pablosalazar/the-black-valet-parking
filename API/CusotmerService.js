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

export async function registerCustomer(data) {
  try {
    const response = await getAxiosIntance().post('', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.error : error.message;
  }
}

export async function getVehicleByPlate(plate) {
  try {
    const response = await getAxiosIntance().get('/search/term?q=' + plate);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.error : error.message;
  }
}

init();