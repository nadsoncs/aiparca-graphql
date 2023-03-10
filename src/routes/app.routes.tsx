import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { Conversation } from '../screens/Conversation';
const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }} 
    >
      <Screen name="home" component={Home}/>
      <Screen name="talk" component={Conversation}/>
      <Screen name="conversation" component={Conversation}/>
    </Navigator>
  )
}