// Importa las funciones necesarias
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Agregar módulo de autenticación

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDBTZ7OIhm2bpGVePdIPDjgrewyNOIvat0",
  authDomain: "tienda-e41bc.firebaseapp.com",
  projectId: "tienda-e41bc",
  storageBucket: "tienda-e41bc.firebasestorage.app",
  messagingSenderId: "105713052405",
  appId: "1:105713052405:web:a33f9641fb4b9956e8b3bc"
};

// Inicializa Firebase
const FirebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(FirebaseApp); // Agregar autenticación

// Exportar Firebase y Auth
export { FirebaseApp, auth };
