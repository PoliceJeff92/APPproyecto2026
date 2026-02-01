// screens/RegistroScreen.js - VERSIÓN MODIFICADA
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function RegistroScreen() {
  const navigation = useNavigation();
  const [formulario, setFormulario] = useState({
    nombreCompleto: '',
    correoElectronico: '',
    claveAcceso: '',
    confirmarClave: '',
    tipoCuenta: 'estandar'
  });
  const [procesando, setProcesando] = useState(false);

  const validarInformacion = () => {
    if (!formulario.nombreCompleto.trim()) {
      Alert.alert('Campo Requerido', 'Debes ingresar tu nombre completo');
      return false;
    }
    if (!formulario.correoElectronico.trim()) {
      Alert.alert('Campo Requerido', 'Tu correo electrónico es necesario');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formulario.correoElectronico)) {
      Alert.alert('Formato Incorrecto', 'El formato del correo no es válido');
      return false;
    }
    if (!formulario.claveAcceso) {
      Alert.alert('Campo Requerido', 'Necesitas establecer una contraseña');
      return false;
    }
    if (formulario.claveAcceso.length < 6) {
      Alert.alert('Contraseña Débil', 'La clave debe contener mínimo 6 caracteres');
      return false;
    }
    if (formulario.claveAcceso !== formulario.confirmarClave) {
      Alert.alert('Claves no Coinciden', 'Ambas contraseñas deben ser idénticas');
      return false;
    }
    return true;
  };

  const manejarCreacionCuenta = async () => {
    if (!validarInformacion()) return;

    setProcesando(true);
    try {
      // 1. Registrar usuario en Firebase Authentication
      const credencialUsuario = await createUserWithEmailAndPassword(
        auth, 
        formulario.correoElectronico.trim(), 
        formulario.claveAcceso
      );
      const usuario = credencialUsuario.user;

      // 2. Almacenar datos complementarios en Firestore
      const datosUsuario = {
        identificador: usuario.uid,
        nombre: formulario.nombreCompleto.trim(),
        correo: formulario.correoElectronico.trim(),
        tipo: formulario.tipoCuenta,
        fechaCreacion: new Date().toISOString(),
        ultimaActualizacion: new Date().toISOString()
      };

      await setDoc(doc(db, 'usuarios', usuario.uid), datosUsuario);

      Alert.alert(
        '✅ Registro Completado',
        `Cuenta creada exitosamente como ${formulario.tipoCuenta === 'administrador' ? 'Administrador' : 'Usuario Estándar'}`,
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
      let mensajeError = 'No se pudo completar el registro';
      switch (error.code) {
        case 'auth/email-already-in-use':
          mensajeError = 'Esta dirección de correo ya está registrada';
          break;
        case 'auth/invalid-email':
          mensajeError = 'El formato del correo no es aceptable';
          break;
        case 'auth/weak-password':
          mensajeError = 'La contraseña no cumple con los requisitos de seguridad';
          break;
        default:
          mensajeError = error.message;
      }
      Alert.alert('❌ Error en el Proceso', mensajeError);
    } finally {
      setProcesando(false);
    }
  };

  const actualizarCampo = (campo, valor) => {
    setFormulario(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.contenedor}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.encabezado}>
          <Text style={styles.tituloPrincipal}>Crear Nueva Cuenta</Text>
          <Text style={styles.subtitulo}>Completa el formulario para registrarte</Text>
        </View>

        {/* Nombre Completo */}
        <View style={styles.grupoCampo}>
          <Text style={styles.etiqueta}>Nombre Completo *</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Ejemplo: María González"
            value={formulario.nombreCompleto}
            onChangeText={(texto) => actualizarCampo('nombreCompleto', texto)}
            autoCapitalize="words"
            editable={!procesando}
          />
        </View>

        {/* Correo Electrónico */}
        <View style={styles.grupoCampo}>
          <Text style={styles.etiqueta}>Correo Electrónico *</Text>
          <TextInput
            style={styles.entrada}
            placeholder="tucorreo@dominio.com"
            value={formulario.correoElectronico}
            onChangeText={(texto) => actualizarCampo('correoElectronico', texto)}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!procesando}
          />
        </View>

        {/* Contraseña */}
        <View style={styles.grupoCampo}>
          <Text style={styles.etiqueta}>Contraseña de Acceso *</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Mínimo 6 caracteres requeridos"
            value={formulario.claveAcceso}
            onChangeText={(texto) => actualizarCampo('claveAcceso', texto)}
            secureTextEntry
            editable={!procesando}
          />
        </View>

        {/* Confirmar Contraseña */}
        <View style={styles.grupoCampo}>
          <Text style={styles.etiqueta}>Repetir Contraseña *</Text>
          <TextInput
            style={styles.entrada}
            placeholder="Vuelve a escribir tu contraseña"
            value={formulario.confirmarClave}
            onChangeText={(texto) => actualizarCampo('confirmarClave', texto)}
            secureTextEntry
            editable={!procesando}
          />
        </View>

        {/* Selección de Tipo de Cuenta */}
        <View style={styles.grupoCampo}>
          <Text style={styles.etiqueta}>Nivel de Acceso *</Text>
          <View style={styles.contenedorTipo}>
            <TouchableOpacity
              style={[
                styles.botonTipo,
                formulario.tipoCuenta === 'estandar' && styles.botonTipoActivo
              ]}
              onPress={() => actualizarCampo('tipoCuenta', 'estandar')}
              disabled={procesando}
            >
              <Text style={[
                styles.textoBotonTipo,
                formulario.tipoCuenta === 'estandar' && styles.textoBotonTipoActivo
              ]}>
                👤 Usuario Regular
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.botonTipo,
                formulario.tipoCuenta === 'administrador' && styles.botonTipoActivo
              ]}
              onPress={() => actualizarCampo('tipoCuenta', 'administrador')}
              disabled={procesando}
            >
              <Text style={[
                styles.textoBotonTipo,
                formulario.tipoCuenta === 'administrador' && styles.textoBotonTipoActivo
              ]}>
                👑 Cuenta Administrativa
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.textoInfoTipo}>
            Selección actual: <Text style={styles.textoDestacado}>
              {formulario.tipoCuenta === 'administrador' ? 'Administrador del Sistema' : 'Usuario con Acceso Básico'}
            </Text>
          </Text>
        </View>

        {/* Botón de Registro */}
        <TouchableOpacity
          style={[styles.botonRegistro, procesando && styles.botonRegistroDeshabilitado]}
          onPress={manejarCreacionCuenta}
          disabled={procesando}
        >
          <Text style={styles.textoBotonRegistro}>
            {procesando ? 'PROCESANDO SOLICITUD...' : 'COMPLETAR REGISTRO'}
          </Text>
        </TouchableOpacity>

        {/* Enlaces Alternativos */}
        <View style={styles.contenedorEnlaces}>
          <TouchableOpacity
            style={styles.enlaceAlternativo}
            onPress={() => navigation.navigate('Login')}
            disabled={procesando}
          >
            <Text style={styles.textoEnlace}>¿Ya posees una cuenta? Ingresa aquí</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.enlaceAlternativo}
            onPress={() => navigation.goBack()}
            disabled={procesando}
          >
            <Text style={styles.textoEnlace}>↶ Regresar a la pantalla principal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: '#f0f3f5',
  },
  encabezado: {
    alignItems: 'center',
    marginBottom: 30,
  },
  tituloPrincipal: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitulo: {
    fontSize: 15,
    color: '#5d6d7e',
    textAlign: 'center',
  },
  grupoCampo: {
    marginBottom: 18,
  },
  etiqueta: {
    fontSize: 15,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  entrada: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d5d8dc',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: '#2c3e50',
  },
  contenedorTipo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  botonTipo: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  botonTipoActivo: {
    backgroundColor: '#3498db',
    borderColor: '#2980b9',
  },
  textoBotonTipo: {
    fontSize: 13,
    fontWeight: '600',
    color: '#495057',
  },
  textoBotonTipoActivo: {
    color: 'white',
  },
  textoInfoTipo: {
    textAlign: 'center',
    fontSize: 13,
    color: '#7f8c8d',
    marginTop: 8,
  },
  textoDestacado: {
    fontWeight: 'bold',
    color: '#3498db',
  },
  botonRegistro: {
    backgroundColor: '#27ae60',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 22,
  },
  botonRegistroDeshabilitado: {
    backgroundColor: '#7f8c8d',
  },
  textoBotonRegistro: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  contenedorEnlaces: {
    alignItems: 'center',
  },
  enlaceAlternativo: {
    paddingVertical: 10,
  },
  textoEnlace: {
    color: '#3498db',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
});