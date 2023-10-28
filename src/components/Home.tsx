import { useState, ChangeEvent, FormEvent } from 'react';
import { createDeviceRegister } from '../utils/api';

interface RegistrationData {
  serial: string;
}

export function Home() {
  const [formData, setFormData] = useState<RegistrationData>({
    serial: '',
  });
  const [message, setMessage] = useState<string | null>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!(formData.serial.length === 11)) {
      setFormData(({
        serial: ''
      }))
      setMessage('O serial deve ter exatamente 11 caracteres')
      return
    }
    const response = await createDeviceRegister(formData.serial)
    setMessage(response);
    console.log(formData);
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Registro S/N</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="serial" className="block text-sm font-medium text-gray-600">
            Serial
          </label>
          <input
            type="text"
            name="serial"
            id="serial"
            value={formData.serial}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Registrar
          </button>
          <p className='text-center pt-3 text-xs' >{message}</p>
        </div>
      </form>
    </>
  );
}

