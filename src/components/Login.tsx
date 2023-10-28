import { useState, ChangeEvent, FormEvent, useContext } from 'react';
import { AuthContext } from '../contexts/auth';

interface FormData {
  email: string;
  password: string;
}

export function Login() {
  const { signIn, loading } = useContext(AuthContext)

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signIn(formData)
    setFormData({
      email: '',
      password: '',
    })
  }

  return (
    <>

      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Senha
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
            disabled={loading}
          >
            {loading ? 'Aguarde' : 'Entrar'}
          </button>
        </div>
      </form>
    </>
  );
}
