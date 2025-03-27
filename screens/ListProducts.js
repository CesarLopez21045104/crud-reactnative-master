import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'

import appFirebase from '../credenciales'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
const db = getFirestore(appFirebase)

const ListProducts = (props) => {

  const [lista, setLista] = useState([])

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'))
        const docs = []
        querySnapshot.forEach((doc) => {
          const { Producto, Tipo, Precio,Stock } = doc.data()
          docs.push({
            id: doc.id,
            Producto,
            Tipo,
            Precio,
            Stock,
          })
        })
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    }
    getLista()
  }, [lista])

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('Create')}>
        <Text style={styles.textoBoton}>Agregar producto</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.textoTitulo}>Lista de productos</Text>
      </View>

      <View style={styles.listaContainer}>
        {
          lista.map((list) => (
            <TouchableOpacity key={list.id} style={styles.botonLista}
              onPress={() => props.navigation.navigate('Show', { productoId: list.id })}>
              <Text style={styles.textoProducto}>{list.Producto}</Text>
              <Text style={styles.textoStock}>Stock: {list.Stock}</Text>
            </TouchableOpacity>
          ))
        }
      </View>
    </ScrollView>
  );
}

export default ListProducts

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  boton: {
    backgroundColor: '#4CAF50',
    height: 45,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  textoBoton: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  textoTitulo: {
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  listaContainer: {
    marginTop: 10,
  },
  botonLista: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  textoNombre: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  textoStock: {
    fontSize: 14,
    fontWeight: '300',
    color: '#888',
    marginTop: 5,
  },
})
