import { NativeBaseProvider, StatusBar } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';
import { AppProvider } from './src/hooks';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/services/apollo';
import { theme } from './src/styles/theme';
import { Loading } from './src/components/Loading';

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold});
  return (
    <NativeBaseProvider theme={theme} >
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AppProvider>
        <ApolloProvider client={client}>
          { fontsLoaded ? <Routes /> : <Loading/> }
        </ApolloProvider>
      </AppProvider>
    </NativeBaseProvider>
  );
}
