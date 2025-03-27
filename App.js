import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Importando los componentes
import CreateProduct from './screens/CreateProduct';
import ListProduct from './screens/ListProducts';
import ShowProduct from './screens/ShowProduct';
import AuthScreen from './screens/AuthScreen'; // Importar pantalla de Login

export default function App() {
  const Stack = createStackNavigator();
  const [user, setUser] = useState(null); // Estado para verificar si el usuario está autenticado

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Si el usuario está autenticado, lo guardamos
      } else {
        setUser(null); // Si no está autenticado, lo dejamos como null
      }
    });

    // Limpiar el listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  function MyStack() {
    return (
      <Stack.Navigator>
        {/* Si el usuario está autenticado, mostrar el resto de pantallas */}
        {user ? (
          <>
            <Stack.Screen name='List' component={ListProduct} />
            <Stack.Screen name='Create' component={CreateProduct} />
            <Stack.Screen name='Show' component={ShowProduct} />
          </>
        ) : (
          // Si el usuario no está autenticado, mostrar el login
          <Stack.Screen name='Auth' component={AuthScreen} />
        )}
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <MyStack />
    </NavigationContainer>
  );
}
