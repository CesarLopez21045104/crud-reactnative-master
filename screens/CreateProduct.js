import React, { useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'

import appFirebase from '../credenciales'
import { getFirestore, collection, addDoc } from 'firebase/firestore'
const db = getFirestore(appFirebase)

export default function CreateProduct(props) {

  const initialState = {
    Producto: '',
    Tipo: '',
    Precio: '',
    Stock: ''
  }

  const [state, setState] = useState(initialState)

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value })
  }

  const SaveProduct = async () => {
    try {
      await addDoc(collection(db, 'productos'), {
        ...state
      })

      Alert.alert('Éxito', 'Producto guardado con éxito')
      props.navigation.navigate('List')
    } catch (error) {
      console.error(error)
      Alert.alert('Error', 'Hubo un problema al guardar el producto')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>Crear Producto</Text>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder='Nombre del Producto'
          value={state.Producto}
          onChangeText={(value) => handleChangeText(value, 'Producto')}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder='Tipo'
          value={state.Tipo}
          onChangeText={(value) => handleChangeText(value, 'Tipo')}
        />
      </View>

      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder='Precio'
          value={state.Precio}
          onChangeText={(value) => handleChangeText(value, 'Precio')}
          keyboardType='numeric'
        />
      </View>
      
      <View style={styles.inputGroup}>
        <TextInput
          style={styles.input}
          placeholder='Stock'
          value={state.stock}
          onChangeText={(value) => handleChangeText(value, 'Stock')}
          keyboardType='numeric'
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={SaveProduct}>
        <Text style={styles.buttonText}>Guardar Producto</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  titulo: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
