import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Animated } from 'react-native';
import appFirebase from '../credenciales';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signOut } from 'firebase/auth';

const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);

const ListProducts = (props) => {
  const [lista, setLista] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-200))[0]; // Animación para el menú lateral

  useEffect(() => {
    const getLista = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { Producto, Tipo, Precio, Stock } = doc.data();
          docs.push({
            id: doc.id,
            Producto,
            Tipo,
            Precio,
            Stock,
          });
        });
        setLista(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getLista();
  }, [lista]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Usar reset en lugar de replace
      navigation.reset({
        index: 0, // Este es el índice de la pantalla que quieres mostrar (0 sería la primera)
        routes: [{ name: 'Auth' }], // El nombre de la pantalla de autenticación
      });
    } catch (error) {
      console.log("Error al cerrar sesión:", error);
    }
  };

  const toggleMenu = () => {
    Animated.timing(slideAnim, {
      toValue: menuVisible ? -200 : 0, // Se despliega o se oculta
      duration: 300,
      useNativeDriver: false,
    }).start();
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      {/* Navbar con botón hamburguesa */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
        <Text style={styles.navbarText}>Gestor de Productos</Text>
      </View>

      {/* Menú lateral oculto */}
      <Animated.View style={[styles.sidebar, { left: slideAnim }]}>
        <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
          <Text style={styles.closeIcon}>✖</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </Animated.View>

      <ScrollView style={styles.scrollContainer}>
        <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('Create')}>
          <Text style={styles.textoBoton}>Agregar producto</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.textoTitulo}>Lista de productos</Text>
        </View>

        <View style={styles.listaContainer}>
          {lista.map((list) => (
            <TouchableOpacity 
              key={list.id} 
              style={styles.botonLista}
              onPress={() => props.navigation.navigate('Show', { productoId: list.id })}>
              <Text style={styles.textoProducto}>{list.Producto}</Text>
              <Text style={styles.textoStock}>Stock: {list.Stock}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ListProducts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 10,
  },
  navbar: {
    backgroundColor: '#4CAF50',
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
  },
  navbarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 22,
    color: '#fff',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: -200,
    width: 200,
    height: '100%',
    backgroundColor: '#333',
    paddingTop: 50,
    paddingHorizontal: 20,
    zIndex: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  closeIcon: {
    fontSize: 20,
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  textoProducto: {
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
});
