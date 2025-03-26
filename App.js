import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//importando los componentes
import CreateProduct from './screens/CreateProduct'
import ListProduct from './screens/ListProducts'
import ShowProduct from './screens/ShowProduct'

export default function App() {

  const Stack = createStackNavigator();

  function MyStack(){
    return(
      <Stack.Navigator>
        <Stack.Screen name='List' component={ListProduct} />
        <Stack.Screen name='Create' component={CreateProduct} />
        <Stack.Screen name='Show' component={ShowProduct} />
      </Stack.Navigator>
        
    )
  }

  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
      
    );
    
}


