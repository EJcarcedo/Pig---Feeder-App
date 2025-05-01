import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartScreen from './screens/start';  
import DetailsScreen from './screens/option'; 
import ScheduleScreen from './screens/Schedule';
import SetTime from './screens/setTime';
import TypeOptions from './screens/TypeOptions';
import StarterOptions from './screens/StarterOptions';
import GrowerOptions from './screens/GrowerOptions';
import FinisherOptions from './screens/FinisherOptions';


const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={StartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: false }} /> 
        <Stack.Screen name="Set" component={SetTime} options={{ headerShown: false }} /> 
        <Stack.Screen name="Type" component={TypeOptions} options={{ headerShown: false }} /> 
        <Stack.Screen name="Starter" component={StarterOptions} options={{ headerShown: false }} /> 
        <Stack.Screen name="Grower" component={GrowerOptions} options={{ headerShown: false }} /> 
        <Stack.Screen name="Finisher" component={FinisherOptions} options={{ headerShown: false }} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}

