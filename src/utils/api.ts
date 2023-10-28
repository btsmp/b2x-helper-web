import axios from 'axios';
const BASE_URL='https://b2x-helper-api.onrender.com/';

export const api = axios.create({
  baseURL: BASE_URL
})

export async function createDeviceRegister(serial: string) {

  try {
    await api.post('/device', {
      serial
    })
    return 'Registrado!'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const response = err.response.data.message.toString() 
    return response
  }
}