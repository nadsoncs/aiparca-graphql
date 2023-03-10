import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/auth';

import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';


export function Routes() {
  const { profile } = useAuth();
  return (
    <NavigationContainer>
      { profile.id ? <AppRoutes /> : <AuthRoutes/>}
    </NavigationContainer>
  )
}