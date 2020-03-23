import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { API_URL } from '../constants/Path';

async function init() {
  ACCESS_TOKEN = await AsyncStorage.getItem('access_token');
}

function getAxiosIntance() {
  return axios.create({
    baseURL: `${API_URL}/places`,
    headers: {
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
  });
  
}

export async function getPlaces() {
  try {
    const response = await getAxiosIntance().get('');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.error : error.message;
  }
}

export async function getServicePoints() {
  try {
    const response = await getAxiosIntance().get('/service-points');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.error : error.message;
  }
}

init();