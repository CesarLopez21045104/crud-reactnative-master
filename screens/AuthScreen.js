import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";

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

  // Validar correo electrónico
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  // Validar contraseña
  const validatePassword = (password) => {
    return password.length > 6;
  };

  // Función para manejar el login
  const handleLogin = async () => {
    setError(""); // Limpiar errores previos
  
    if (!validateEmail(email)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }
    if (!validatePassword(password)) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso");
    } catch (err) {
      console.log("Código de error de Firebase:", err.code); // Depuración
  
      switch (err.code) {
        case "auth/invalid-email":
          setError("El formato del correo electrónico no es válido.");
          break;
        case "auth/user-not-found":
          setError("No hay una cuenta con este correo.");
          break;
        case "auth/wrong-password": // Código antiguo
        case "auth/invalid-credential": // Nuevo código de Firebase
          setError("La contraseña es incorrecta.");
          break;
        case "auth/too-many-requests":
          setError("Demasiados intentos fallidos. Intenta más tarde.");
          break;
        default:
          setError("Hubo un problema, intenta de nuevo más tarde.");
          break;
      }
    }
  };

  // Función para manejar el registro
  const handleRegister = async () => {
    setError(""); // Limpiar errores previos
    if (!validateEmail(email)) {
      setError("Por favor ingresa un correo electrónico válido.");
      return;
    }
    if (!validatePassword(password)) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registro exitoso");
      // Aquí puedes navegar o mostrar una pantalla diferente
    } catch (err) {
      console.log("Código de error de Firebase:", err.code); // Depuración
      switch (err.code) {
        case "auth/email-already-in-use":
          setError("El correo electrónico ya está registrado.");
          break;
        case "auth/weak-password":
          setError("La contraseña es demasiado débil.");
          break;
        default:
          setError("Hubo un problema con el registro. Intenta nuevamente.");
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* Icono de la tienda */}
      <Icon name="shopping-cart" size={150} color="#4CAF50" style={styles.icon} />
      
      <Text style={styles.title}>{isLogin ? "Login" : "Registro"}</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={isLogin ? handleLogin : handleRegister}>
        <Text style={styles.buttonText}>{isLogin ? "Iniciar Sesión" : "Registrar"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "90%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  error: {
    color: "red",
    marginBottom: 15,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    width: "90%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  toggleText: {
    fontSize: 16,
    color: "#007BFF",
  },
});

export default App;
