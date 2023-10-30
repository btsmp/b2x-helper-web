import { createContext, useState, useEffect, ReactNode } from 'react'
import { toast } from 'react-toastify'
import { api } from '../utils/api'
import axios from 'axios'

interface CredentialProps {
  email: string
  password: string
}

interface AuthContextData {
  signIn: (credentials: CredentialProps) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode
}
export const AuthContext = createContext<AuthContextData>({
  signIn: async () => { },
  signOut: () => { },
  loading: false,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoagind] = useState(false)
  const tokenUser = '@b2xhelper-token'

  function placeToken(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  function saveTokenInLocalStorage(token: string) {
    localStorage.setItem(tokenUser, token)
  }

  async function signIn({ email, password }: CredentialProps) {

    try {
      setLoagind(true)
      const response = await api.post("/auth/login", { email, password })
      const { access_token: token } = response.data

      placeToken(token)
      saveTokenInLocalStorage(token)
      setLoagind(false)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.log(err.request.status)
      }
      setLoagind(false)
    }
  }
  async function signOut() {
    localStorage.removeItem(tokenUser)

  }
  useEffect(() => {
    const token = localStorage.getItem(tokenUser)
    token ? placeToken(token) : undefined

  }, [])

  return (
    <AuthContext.Provider value={{ signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}