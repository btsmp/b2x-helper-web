import { createContext, useState, useEffect, ReactNode } from 'react'
import { api } from '../utils/api'

interface CredentialProps {
  email: string
  password: string
}

interface AuthContextData {
  tokenData: string | null;
  signIn: (credentials: CredentialProps) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode
}
export const AuthContext = createContext<AuthContextData>({
  tokenData: '',
  signIn: async () => { },
  signOut: () => { },
  loading: false,
});

export function AuthProvider({ children }: AuthProviderProps) {
  const [loading, setLoagind] = useState(false)
  const [tokenData, setTokenData] = useState<string | null>('')
  const tokenUser = '@b2xhelper-token'

  function placeToken(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  function saveTokenInLocalStorage(token: string) {
    localStorage.setItem(tokenUser, token)

    return {
      token
    }

  }
  async function signIn({ email, password }: CredentialProps) {

    try {
      setLoagind(true)
      const response = await api.post("/auth/login", { email, password })
      const { access_token: token } = response.data

      placeToken(token)
      saveTokenInLocalStorage(token)
      setTokenData(token)
      setLoagind(false)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response.data) {
        console.error(err.response.data.message)
      } else {
        console.error('Ocorreu um erro ao fazer login!')
      }

      setLoagind(false)
    }
  }
  async function signOut() {
    localStorage.removeItem(tokenUser)
    setTokenData('')
  }
  useEffect(() => {
    const token = localStorage.getItem(tokenUser)
    setTokenData(token)
    token ? placeToken(token) : undefined
  }, [])

  return (
    <AuthContext.Provider value={{ tokenData, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  )
}