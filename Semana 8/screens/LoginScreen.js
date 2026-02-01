// screens/LoginScreen.js - VERSIÓN CORREGIDA Y MODIFICADA
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { updateUserData } = useAuth();
  
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [cargando, setCargando] = useState(false);
  const [errores, setErrores] = useState({});

  const validarFormulario = () => {
    const nuevosErrores = {};
    
    if (!correo.trim()) {
      nuevosErrores.correo = 'Se requiere dirección de correo';
    } else if (!/\S+@\S+\.\S+/.test(correo)) {
      nuevosErrores.correo = 'Formato de correo inválido';
    }
    
    if (!contrasena) {
      nuevosErrores.contrasena = 'Debes ingresar tu contraseña';
    } else if (contrasena.length < 6) {
      nuevosErrores.contrasena = 'Mínimo 6 caracteres requeridos';
    }
    
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarIngreso = async () => {
    if (!validarFormulario()) return;

    setCargando(true);
    try {
      const credencialUsuario = await signInWithEmailAndPassword(auth, correo, contrasena);
      const usuario = credencialUsuario.user;
      
      Alert.alert(
        '✅ Acceso Confirmado',
        `Bienvenido nuevamente ${usuario.email}`,
        [{ 
          text: 'Continuar', 
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }]
            });
          }
        }]
      );
      
    } catch (error) {
      let mensajeError = 'No se pudo completar el acceso';
      switch (error.code) {
        case 'auth/user-not-found':
          mensajeError = 'Esta cuenta no está registrada';
          break;
        case 'auth/wrong-password':
          mensajeError = 'La contraseña ingresada es incorrecta';
          break;
        case 'auth/invalid-email':
          mensajeError = 'Correo electrónico no válido';
          break;
        case 'auth/too-many-requests':
          mensajeError = 'Demasiados intentos fallidos. Intenta más tarde';
          break;
        case 'auth/user-disabled':
          mensajeError = 'Esta cuenta ha sido desactivada';
          break;
        default:
          mensajeError = error.message;
      }
      Alert.alert('❌ Error de Acceso', mensajeError);
    } finally {
      setCargando(false);
    }
  };

  const manejarRecuperacion = () => {
    navigation.navigate('ForgotPassword');
  };

  const manejarRegistro = () => {
    navigation.navigate('Registro');
  };

  const manejarRegreso = () => {
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.contenedor}>
        <View style={styles.encabezado}>
          <Text style={styles.tituloPrincipal}>Acceso al Sistema</Text>
          <Text style={styles.subtitulo}>Ingresa tus credenciales</Text>
        </View>

        {/* Campo Correo */}
        <View style={styles.grupoEntrada}>
          <Text style={styles.etiqueta}>Correo Electrónico</Text>
          <TextInput
            style={[styles.entrada, errores.correo && styles.entradaError]}
            placeholder="correo@ejemplo.com"
            value={correo}
            onChangeText={(texto) => {
              setCorreo(texto);
              if (errores.correo) setErrores(prev => ({ ...prev, correo: '' }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!cargando}
          />
          {errores.correo && <Text style={styles.textoError}>{errores.correo}</Text>}
        </View>

        {/* Campo Contraseña */}
        <View style={styles.grupoEntrada}>
          <View style={styles.encabezadoContrasena}>
            <Text style={styles.etiqueta}>Contraseña</Text>
            <TouchableOpacity onPress={manejarRecuperacion}>
              <Text style={styles.textoRecuperacion}>¿No recuerdas tu clave?</Text>
            </TouchableOpacity>
          </View>
          <TextInput
            style={[styles.entrada, errores.contrasena && styles.entradaError]}
            placeholder="••••••••"
            value={contrasena}
            onChangeText={(texto) => {
              setContrasena(texto);
              if (errores.contrasena) setErrores(prev => ({ ...prev, contrasena: '' }));
            }}
            secureTextEntry
            editable={!cargando}
          />
          {errores.contrasena && <Text style={styles.textoError}>{errores.contrasena}</Text>}
        </View>

        {/* Botón de Ingreso */}
        <TouchableOpacity
          style={[styles.botonIngreso, cargando && styles.botonDeshabilitado]}
          onPress={manejarIngreso}
          disabled={cargando}
        >
          {cargando ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.textoBotonIngreso}>INGRESAR AL SISTEMA</Text>
          )}
        </TouchableOpacity>

        {/* Separador */}
        <View style={styles.contenedorSeparador}>
          <View style={styles.lineaSeparador} />
          <Text style={styles.textoSeparador}>ó</Text>
          <View style={styles.lineaSeparador} />
        </View>

        {/* Botón de Registro */}
        <TouchableOpacity
          style={styles.botonRegistro}
          onPress={manejarRegistro}
          disabled={cargando}
        >
          <Text style={styles.textoBotonRegistro}>CREAR NUEVA CUENTA</Text>
        </TouchableOpacity>

        {/* Enlace de Regreso */}
        <TouchableOpacity
          style={styles.enlaceRegreso}
          onPress={manejarRegreso}
          disabled={cargando}
        >
          <Text style={styles.textoEnlaceRegreso}>← Regresar al Inicio</Text>
        </TouchableOpacity>

        {/* Información de Seguridad */}
        <View style={styles.infoSeguridad}>
          <Text style={styles.textoSeguridad}>🔒 Conexión protegida</Text>
          <Text style={styles.subtextoSeguridad}>Autenticación segura con Firebase</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f2f4f6',
    justifyContent: 'center',
  },
  encabezado: {
    alignItems: 'center',
    marginBottom: 38,
  },
  tituloPrincipal: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: '#7f8c8d',
  },
  grupoEntrada: {
    marginBottom: 18,
  },
  etiqueta: {
    fontSize: 15,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  encabezadoContrasena: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  textoRecuperacion: {
    color: '#3498db',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  entrada: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d5dbdb',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#2c3e50',
  },
  entradaError: {
    borderColor: '#e74c3c',
    backgroundColor: '#fef5f5',
  },
  textoError: {
    color: '#e74c3c',
    fontSize: 13,
    marginTop: 5,
  },
  botonIngreso: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 18,
  },
  botonDeshabilitado: {
    backgroundColor: '#a0c8f0',
  },
  textoBotonIngreso: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  contenedorSeparador: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 18,
  },
  lineaSeparador: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  textoSeparador: {
    marginHorizontal: 15,
    color: '#7f8c8d',
    fontSize: 13,
  },
  botonRegistro: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 18,
    borderWidth: 2,
    borderColor: '#3498db',
  },
  textoBotonRegistro: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: 'bold',
  },
  enlaceRegreso: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  textoEnlaceRegreso: {
    color: '#7f8c8d',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  infoSeguridad: {
    alignItems: 'center',
    marginTop: 28,
    padding: 15,
    backgroundColor: '#e9f7fe',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#b6e0fe',
  },
  textoSeguridad: {
    color: '#0c5460',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtextoSeguridad: {
    color: '#7f8c8d',
    fontSize: 11,
  },
});