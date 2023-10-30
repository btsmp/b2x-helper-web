import { useState } from 'react';
import { createDeviceRegister } from '../utils/api';
import { Button } from './Button';
import { useForm } from 'react-hook-form'

interface FormData {
  serial: string;
}

export function Home() {

  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm<FormData>()
  const [message, setMessage] = useState<string | null>()

  async function onSubmit(data: FormData) {
    setLoading(true)

    if (!(data.serial.length === 11)) {
      setMessage('O serial deve ter exatamente 11 caracteres')
      setLoading(false)
      return
    }
    const response = await createDeviceRegister(data.serial)
    setMessage(response);
    setLoading(false)
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Registro S/N</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="serial" className="block text-sm font-medium text-gray-600">
            Serial
          </label>
          <input
            {...register('serial', { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-6">
          <Button title='Registrar' loading={loading} />
          <p className='text-center pt-3 text-xs' >{message}</p>
        </div>
      </form>
    </>
  );
}

