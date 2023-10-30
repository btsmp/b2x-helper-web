import { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import { Button } from './Button';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

export function Login() {
  const { register, handleSubmit } = useForm<FormData>()
  const { signIn, loading } = useContext(AuthContext)

  function onSubmit(data: FormData) {
    try {
      signIn(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            {...register('email', { required: true })}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Senha
          </label>
          <input
            {...register('password', { required: true })}
            type='password'
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <Button title='Entrar' loading={loading} />
        </div>
      </form >
    </>
  );
}
