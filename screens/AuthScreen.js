// Importar las funciones necesarias de Firebase
import React, { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDBTZ7OIhm2bpGVePdIPDjgrewyNOIvat0",
  authDomain: "tienda-e41bc.firebaseapp.com",
  projectId: "tienda-e41bc",
  storageBucket: "tienda-e41bc.firebasestorage.app",
  messagingSenderId: "105713052405",
  appId: "1:105713052405:web:a33f9641fb4b9956e8b3bc"
};

// Inicializar Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(FirebaseApp);

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // Controla si es Login o Registro
  const [error, setError] = useState("");

  // Función para manejar el login
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso");
      // Aquí puedes navegar o mostrar una pantalla diferente
    } catch (err) {
      setError(err.message);
      console.error("Error en el login:", err.message);
    }
  };

  // Función para manejar el registro
  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registro exitoso");
      // Aquí puedes navegar o mostrar una pantalla diferente
    } catch (err) {
      setError(err.message);
      console.error("Error en el registro:", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? "Login" : "Registro"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button
        title={isLogin ? "Iniciar Sesión" : "Registrar"}
        onPress={isLogin ? handleLogin : handleRegister}
      />
      <Button
        title={isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        onPress={() => setIsLogin(!isLogin)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default App;
