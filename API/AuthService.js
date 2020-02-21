import axios from 'axios';
import { API_URL } from '../constants/Path';
import { AsyncStorage } from 'react-native';


export async function loginUser(data) { 
  try {
    const response = await axios.post(API_URL + '/auth/login', data);
    await AsyncStorage.setItem('access_token', response.data.access_token);
    await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data.error : error.message;
  }
}
