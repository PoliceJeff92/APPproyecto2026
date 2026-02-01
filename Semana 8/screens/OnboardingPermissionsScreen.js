import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, 
  SafeAreaView, ScrollView, Switch 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OnboardingPermissionsScreen() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  const handleCompleteOnboarding = async (nextScreen = 'Home') => {
    try {
      await AsyncStorage.setItem('@onboarding_completed', 'true');
      
      navigation.reset({
        index: 0,
        routes: [{ name: nextScreen }]
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLoginDirect = async () => {
    try {
      await AsyncStorage.setItem('@onboarding_completed', 'true');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
              <View style={styles.progressCircle}>
                <Text style={styles.progressNumber}>2</Text>
              </View>
            </View>
            
            <Text style={styles.title}>Configuración Inicial</Text>
            <Text style={styles.subtitle}>
              Personaliza tu experiencia y elige cómo quieres comenzar
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferencias del Sistema</Text>
            
            <View style={styles.permissionCard}>
              <View style={styles.permissionInfo}>
                <View style={styles.permissionIcon}>
                  <Text>🔔</Text>
                </View>
                <View style={styles.permissionText}>
                  <Text style={styles.permissionTitle}>Alertas del Sistema</Text>
                  <Text style={styles.permissionDescription}>
                    Notificaciones sobre actividad de tu cuenta
                  </Text>
                </View>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: '#E8E8FF', true: '#6C63FF' }}
                thumbColor={'white'}
              />
            </View>
            
            <View style={styles.permissionCard}>
              <View style={styles.permissionInfo}>
                <View style={styles.permissionIcon}>
                  <Text>📊</Text>
                </View>
                <View style={styles.permissionText}>
                  <Text style={styles.permissionTitle}>Análisis de Uso</Text>
                  <Text style={styles.permissionDescription}>
                    Datos anónimos para mejorar la experiencia
                  </Text>
                </View>
              </View>
              <Switch
                value={analytics}
                onValueChange={setAnalytics}
                trackColor={{ false: '#E8E8FF', true: '#4ECDC4' }}
                thumbColor={'white'}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Selecciona tu Acceso</Text>
            
            <TouchableOpacity 
              style={styles.accessOption}
              onPress={() => handleCompleteOnboarding('Home')}
            >
              <View style={styles.optionIcon}>
                <Text>✨</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Explorar Primero</Text>
                <Text style={styles.optionDescription}>
                  Ve a la pantalla principal para conocer las opciones
                </Text>
              </View>
              <Text style={styles.optionArrow}>→</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.accessOption}
              onPress={() => handleCompleteOnboarding('Registro')}
            >
              <View style={styles.optionIcon}>
                <Text>👤</Text>
              </View>
              <View style={styles.optionContent}>
                <Text style={styles.optionTitle}>Crear Cuenta Nueva</Text>
                <Text style={styles.optionDescription}>
                  Regístrate ahora para acceder a todas las funciones
                </Text>
              </View>
              <Text style={styles.optionArrow}>→</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.noteCard}>
            <Text style={styles.noteIcon}>💡</Text>
            <Text style={styles.noteText}>
              Puedes cambiar estas preferencias en cualquier momento desde la Configuración de tu cuenta.
            </Text>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.secondaryButtonText}>Atrás</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => handleCompleteOnboarding('Home')}
          >
            <Text style={styles.primaryButtonText}>Comenzar</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.loginSection}>
          <Text style={styles.loginPrompt}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={handleLoginDirect}>
            <Text style={styles.loginLink}>Acceder directamente</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  progressBar: {
    width: 100,
    height: 4,
    backgroundColor: '#E8E8FF',
    borderRadius: 2,
    marginBottom: 25,
    position: 'relative',
  },
  progressFill: {
    width: '50%',
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 2,
  },
  progressCircle: {
    position: 'absolute',
    right: 0,
    top: -8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressNumber: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D3047',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B8C',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3047',
    marginBottom: 20,
    paddingLeft: 5,
  },
  permissionCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 18,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F0F0FF',
  },
  permissionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  permissionIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#F0F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  permissionText: {
    flex: 1,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3047',
    marginBottom: 5,
  },
  permissionDescription: {
    fontSize: 14,
    color: '#8B8BA3',
    lineHeight: 20,
  },
  accessOption: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionIcon: {
    width: 60,
    height: 60,
    borderRadius: 18,
    backgroundColor: '#F0F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3047',
    marginBottom: 8,
  },
  optionDescription: {
    fontSize: 14,
    color: '#6B6B8C',
    lineHeight: 20,
  },
  optionArrow: {
    fontSize: 24,
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  noteCard: {
    flexDirection: 'row',
    backgroundColor: '#E8F4FF',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C2E0FF',
    alignItems: 'center',
  },
  noteIcon: {
    fontSize: 24,
    marginRight: 15,
    color: '#4A6FA5',
  },
  noteText: {
    flex: 1,
    fontSize: 14,
    color: '#4A6FA5',
    lineHeight: 20,
  },
  footer: {
    padding: 30,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#F0F0FF',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 15,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#6C63FF',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  secondaryButtonText: {
    color: '#6C63FF',
    fontSize: 18,
    fontWeight: '700',
  },
  loginSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    fontSize: 15,
    color: '#6B6B8C',
  },
  loginLink: {
    fontSize: 15,
    color: '#6C63FF',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});