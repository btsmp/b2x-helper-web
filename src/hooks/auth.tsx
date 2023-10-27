import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { api } from "../utils/api"

interface User {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (credentials: SignInInterface) => Promise<void>;
  signOut: () => void;
}

interface SignInInterface {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<User | null>(null);

  function placeToken(token: string) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  function saveUserSessionInLocalStorage(user: User, token: string) {
    localStorage.setItem('@b2xhelper-user', JSON.stringify(user));
    localStorage.setItem('@b2xhelper-token', token);

    return {
      user,
      token
    };
  }

  async function signIn({ email, password }: SignInInterface) {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, password });
      const { user, token } = response.data;

      placeToken(token);

      saveUserSessionInLocalStorage(user, token);

      setData(user);
      setLoading(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response.data) {
        console.log(err.response.data.message);
      } else {
        console.log('Ocorreu um erro ao fazer login!');
      }

      setLoading(false);
    }
  }

  function signOut() {
    localStorage.removeItem('@b2xhelper-user');
    localStorage.removeItem('@b2xhelper-token');

    setData(null);
  }

  useEffect(() => {
    const userStr = localStorage.getItem('@b2xhelper-user');
    const token = localStorage.getItem('@b2xhelper-token');

    if (userStr && token) {
      placeToken(token);
      setData(JSON.parse(userStr));
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      loading,
      user: data
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
