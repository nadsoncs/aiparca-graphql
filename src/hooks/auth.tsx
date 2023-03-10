import { api } from '../services/api';
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface School {
  key: string;
  name: string;
}
interface User {
  login: string;
  schoolId: string;
  token: string;
}

interface Profile {
  id: string;
  schoolName: string;
  fullName: string;
  matricula: string;
  riskLevel: string;
  foto?: string;
}

interface UserData {
  login: string;
  schoolId: string;
  token: string;
  profile: Profile;
}

interface SignInCredentials {
  login: string;
  password: string;
  school: School;
}

interface AuthContextData {
  user: User;
  profile: Profile;
  isLogging: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);
  const [user, setUser] = useState<User>({} as User);
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const userStorageKey = '@aiparca:user';

  async function signIn({ login, password, school } : SignInCredentials) {
    setIsLogging(true);
    try {
      const dataParams = JSON.stringify({
        "login": login,
        "password": password
      });
  
      const response = await api.post(`/${school.key}/@login`, dataParams);
      
      if( response.status === 401 ) {
        setIsLogging(false);

        return Alert.alert(
          'Erro na autenticação',
          'E-mail ou usuário inválido!'
        )
      }
      
      const { token } = response.data;

      const userData = {
        login,
        schoolId: school.key,
        token
      }

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);

      try {
        const profileResponse = await api.get(`/${school.key}/Estudantes/${login}`);
      
        const foto = profileResponse.data.foto? profileResponse.data.foto.download : '';

        const lastHistoryKey = Object.values(profileResponse.data.historicoRisco).length - 1;
        const riskLevel = profileResponse.data.historicoRisco ? Object.values(profileResponse.data.historicoRisco)[lastHistoryKey] as string : '';
        const riskLevelMessage = createRiskLevelMessage(riskLevel);

        const profileData = {
          id: profileResponse.data.UID,
          schoolName: school.name,
          fullName: profileResponse.data.title,
          matricula: profileResponse.data.matricula,
          riskLevel: riskLevelMessage,
          foto
        };
      
        await saveUserProfile( userData, profileData);
        setProfile(profileData);
      } catch (error) {
        console.log((error))
        setIsLogging(false);
        throw new Error(String(error));
      }
    } catch (error) {
      console.log((error))
      setIsLogging(false);
      throw new Error(String(error));
    }
    setIsLogging(false);
  }

  function createRiskLevelMessage (riskLevel: string) {
    switch(riskLevel) {
        case 'CONSIDERAVEL':
          return 'Tá precisando de ajuda?';
        case 'ELEVADO':
          return 'Ei, o que está acontecendo?';
        case 'EXTREMO':
          return 'Precisamos conversar, urgente!'
        default:
          return ''
      }
  }

  async function saveUserProfile (user: User, profile: Profile) {   
    const userLoggedIn = {
      login: user.login,
      schoolId: user.schoolId,
      token: user.token,
      profile
    }

    try {
      AsyncStorage.setItem(userStorageKey, JSON.stringify(userLoggedIn));
    } catch (error) {
      console.log('AsyncStorage save', error);
    }
  }

  async function signOut() {
    AsyncStorage.removeItem(userStorageKey);
    api.defaults.headers.common['Authorization'] = ''
    setUser({} as User);
    setProfile({} as Profile);
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        const userStorage = await AsyncStorage.getItem(userStorageKey);
        
        if (userStorage) {
          const userData = JSON.parse(userStorage) as UserData;
          setUser({
            login: userData.login,
            schoolId: userData.schoolId,
            token: userData.token
          });
          api.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
          setProfile({
            id: userData.profile.id,
            schoolName: userData.profile.schoolName,
            fullName: userData.profile.fullName,
            matricula: userData.profile.matricula,
            riskLevel: userData.profile.riskLevel,
            foto: userData.profile.foto
          })
        }
        
      } catch (error) {
        console.log("loadUserData", error)
      }
    }
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLogging,
        signIn,
        signOut,
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth }

