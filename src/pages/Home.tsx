import { useState, ChangeEvent, FormEvent } from 'react';

interface RegistrationData {
  serial: string;
}

export function Home() {
  const [formData, setFormData] = useState<RegistrationData>({
    serial: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Adicione a lógica de registro aqui, se necessário
    console.log(formData);
  };

  return (
    <div className="flex bg-slate-800 items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
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
          </div>
        </form>
      </div>
    </div>
  );
}

