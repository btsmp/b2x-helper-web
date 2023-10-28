import axios from 'axios';
import env from "react-dotenv";

export const api = axios.create({
  baseURL: env.BASE_URL
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