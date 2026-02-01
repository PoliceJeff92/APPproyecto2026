import React from 'react';
import { 
  View, Text, TouchableOpacity, StyleSheet, 
  SafeAreaView, ScrollView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🔐</Text>
          </View>
          
          <Text style={styles.title}>Acceso Seguro Pro</Text>
          
          <Text style={styles.subtitle}>
            Plataforma de autenticación con gestión avanzada de privilegios
          </Text>
          
          <View style={styles.featuresGrid}>
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text>🛡️</Text>
              </View>
              <Text style={styles.featureTitle}>Protección Total</Text>
              <Text style={styles.featureText}>
                Encriptación de extremo a extremo para máxima seguridad
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text>👥</Text>
              </View>
              <Text style={styles.featureTitle}>Gestión de Roles</Text>
              <Text style={styles.featureText}>
                Sistema flexible de permisos y niveles de acceso
              </Text>
            </View>
            
            <View style={styles.featureCard}>
              <View style={styles.featureIcon}>
                <Text>⚡</Text>
              </View>
              <Text style={styles.featureTitle}>Rendimiento</Text>
              <Text style={styles.featureText}>
                Interfaz optimizada para una experiencia fluida
              </Text>
            </View>
          </View>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>100%</Text>
              <Text style={styles.statLabel}>Seguro</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24/7</Text>
              <Text style={styles.statLabel}>Disponible</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>∞</Text>
              <Text style={styles.statLabel}>Escalable</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => navigation.navigate('OnboardingPermissions')}
        >
          <Text style={styles.primaryButtonText}>Continuar</Text>
          <Text style={styles.buttonArrow}>→</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.skipButtonText}>Omitir introducción</Text>
        </TouchableOpacity>
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
    paddingTop: 50,
    alignItems: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  icon: {
    fontSize: 50,
  },
  title: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2D3047',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 18,
    color: '#6B6B8C',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  featuresGrid: {
    width: '100%',
    marginBottom: 40,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F0F0FF',
  },
  featureIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F0F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3047',
    marginBottom: 10,
    textAlign: 'center',
  },
  featureText: {
    fontSize: 15,
    color: '#6B6B8C',
    textAlign: 'center',
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    width: '100%',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#6C63FF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#8B8BA3',
    fontWeight: '600',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#F0F0FF',
    marginHorizontal: 15,
  },
  footer: {
    padding: 30,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#F0F0FF',
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: '#6C63FF',
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginRight: 10,
  },
  buttonArrow: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  skipButton: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#8B8BA3',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '500',
  },
});