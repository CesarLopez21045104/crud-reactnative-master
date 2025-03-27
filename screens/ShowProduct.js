import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native'

import appFirebase from '../credenciales'
import { getFirestore, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'

const db = getFirestore(appFirebase)

export default function ShowProduct(props) {

  const [product, setProduct] = useState({
    Producto: '',
    Tipo: '',
    Precio: '',
  })
  const [editable, setEditable] = useState(false)

  const getOneProduct = async (id) => {
    try {
      const docRef = doc(db, 'productos', id)
      const docSnap = await getDoc(docRef)
      setProduct(docSnap.data())
    }
    catch (error) {
      console.log(error)
    }
  }

  const editProduct = (field, value) => {
    // Si el valor editado es para el stock, eliminamos cualquier signo de dólar antes de actualizar el estado
    if (field === 'Precio') {
      value = value.replace('$', '').trim();  // Eliminamos el signo de dólar
    }

    setProduct({
      ...product,
      [field]: value,
    })
  }

  const saveProduct = async () => {
    try {
      const docRef = doc(db, 'productos', props.route.params.productoId)
      await updateDoc(docRef, product)
      Alert.alert('Éxito', 'Producto actualizado con éxito')
      setEditable(false)
    } catch (error) {
      console.log(error)
      Alert.alert('Error', 'No se pudo actualizar el producto')
    }
  }

  const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'productos', id))
    Alert.alert('Éxito', 'Producto eliminado con éxito')
    props.navigation.navigate('List')
  }

  useEffect(() => {
    getOneProduct(props.route.params.productoId)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.Producto}>Detalle del Producto</Text>

      <View style={styles.productDetails}>
        <Text style={styles.sub}>Producto:</Text>
        <TextInput
          style={styles.productInput}
          value={product.Producto}
          onChangeText={(text) => editProduct('Producto', text)}
          editable={editable}
        />

        <Text style={styles.sub}>Tipo:</Text>
        <TextInput
          style={styles.productInput}
          value={product.Tipo}
          onChangeText={(text) => editProduct('Tipo', text)}
          editable={editable}
        />

        <Text style={styles.sub}>Precio:</Text>
        <TextInput
          style={styles.productInput}
          value={`$${product.Precio}`}  // Mostrar el precio con el signo de dólar, solo visualmente
          onChangeText={(text) => editProduct('Precio', text)}  // Actualizar el valor sin el signo de dólar
          editable={editable}
          keyboardType="numeric"
        />

        <Text style={styles.sub}>Stock:</Text>
        <TextInput
          style={styles.productInput}
          value={product.Stock}
          onChangeText={(text) => editProduct('Stock', text)}
          editable={editable}
        />


      </View>

      <View style={styles.buttonsContainer}>
        {editable ? (
          <TouchableOpacity style={styles.saveButton} onPress={saveProduct}>
            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={() => setEditable(true)}>
            <Text style={styles.editButtonText}>Editar Producto</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteProduct(props.route.params.productoId)}>
          <Text style={styles.deleteButtonText}>Eliminar Producto</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  titulo: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  productDetails: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  sub: {
    fontSize: 18,
    color: '#555',
    marginBottom: 10,
  },
  productInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  buttonsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },
  deleteButton: {
    backgroundColor: '#FF4C4C',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})
