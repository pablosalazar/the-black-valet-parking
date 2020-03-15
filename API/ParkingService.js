import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL } from '../constants/Path';

async function init() {
  ACCESS_TOKEN = await AsyncStorage.getItem('access_token');
}

function getAxiosIntance() {
  const axiosInstance = axios.create({
    baseURL: `${API_URL}/parking-services`,
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    }
  });
  return axiosInstance;
}

export async function createParkingService(data) {
  try {
    const response = await getAxiosIntance().post('', data);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.error : error.message;
  }
}

init();