import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user, userData, isAuthenticated, logout } = useAuth();

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('Registro');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleDashboard = () => {
    navigation.navigate('Dashboard');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.heroSection}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>🔒</Text>
        </View>
        <Text style={styles.welcomeTitle}>Secure Access</Text>
        <Text style={styles.welcomeSubtitle}>
          Sistema de gestión con autenticación avanzada
        </Text>
      </View>

      {isAuthenticated ? (
        <View style={styles.authSection}>
          <View style={styles.userWelcomeCard}>
            <View style={styles.userAvatar}>
              <Text style={styles.avatarText}>
                {userData?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </Text>
            </View>
            <Text style={styles.welcomeBack}>¡Bienvenido de vuelta!</Text>
            <Text style={styles.userDisplayName}>
              {userData?.name || user?.email?.split('@')[0] || 'Usuario'}
            </Text>
            <View style={[
              styles.roleTag,
              userData?.role === 'admin' ? styles.adminTag : styles.userTag
            ]}>
              <Text style={styles.roleTagText}>
                {userData?.role === 'admin' ? 'Administrador' : 'Usuario Registrado'}
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.primaryActionButton}
            onPress={handleDashboard}
          >
            <Text style={styles.buttonIcon}>🚀</Text>
            <View style={styles.buttonTextContainer}>
              <Text style={styles.buttonMainText}>Acceder al Panel</Text>
              <Text style={styles.buttonSubText}>Gestiona tu cuenta</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryActionButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutIcon}>↩️</Text>
            <Text style={styles.secondaryButtonText}>Finalizar Sesión</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.authSection}>
          <View style={styles.authOptions}>
            <TouchableOpacity 
              style={styles.createAccountButton}
              onPress={handleRegister}
            >
              <View style={styles.buttonIconContainer}>
                <Text style={styles.buttonEmoji}>✨</Text>
              </View>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonTitle}>Crear Nueva Cuenta</Text>
                <Text style={styles.buttonDescription}>
                  Regístrate y comienza a utilizar el sistema
                </Text>
              </View>
              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>
            
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>o</Text>
              <View style={styles.dividerLine} />
            </View>
            
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <View style={styles.buttonIconContainer}>
                <Text style={styles.buttonEmoji}>🔑</Text>
              </View>
              <View style={styles.buttonContent}>
                <Text style={styles.buttonTitle}>Iniciar Sesión</Text>
                <Text style={styles.buttonDescription}>
                  Accede con tu cuenta existente
                </Text>
              </View>
              <Text style={styles.arrowIcon}>→</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={styles.forgotPasswordLink}
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordIcon}>🔓</Text>
            <Text style={styles.forgotPasswordText}>
              ¿Problemas para acceder? Recupera tu cuenta
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.featureGrid}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🛡️</Text>
            <Text style={styles.featureText}>Seguridad</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>⚡</Text>
            <Text style={styles.featureText}>Rápido</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🌐</Text>
            <Text style={styles.featureText}>Accesible</Text>
          </View>
        </View>
        <Text style={styles.footerText}>v2.3 • Sistema de Autenticación</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FF',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
  },
  heroSection: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 25,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 10,
  },
  logo: {
    fontSize: 50,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#2D3047',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#6B6B8C',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  authSection: {
    width: '100%',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  userWelcomeCard: {
    backgroundColor: 'white',
    padding: 35,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 35,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F0F0FF',
  },
  userAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  welcomeBack: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3047',
    marginBottom: 8,
  },
  userDisplayName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#6C63FF',
    marginBottom: 20,
  },
  roleTag: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 200,
  },
  adminTag: {
    backgroundColor: '#FF6B6B',
  },
  userTag: {
    backgroundColor: '#6C63FF',
  },
  roleTagText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  primaryActionButton: {
    flexDirection: 'row',
    backgroundColor: '#6C63FF',
    paddingVertical: 22,
    paddingHorizontal: 30,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  buttonIcon: {
    fontSize: 28,
    marginRight: 20,
    color: 'white',
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonMainText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  buttonSubText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  secondaryActionButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 18,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 3,
  },
  logoutIcon: {
    fontSize: 22,
    marginRight: 15,
  },
  secondaryButtonText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: '700',
  },
  authOptions: {
    width: '100%',
    maxWidth: 400,
  },
  createAccountButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  buttonIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#F0F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  buttonEmoji: {
    fontSize: 28,
  },
  buttonContent: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3047',
    marginBottom: 5,
  },
  buttonDescription: {
    fontSize: 14,
    color: '#6B6B8C',
    lineHeight: 20,
  },
  arrowIcon: {
    fontSize: 24,
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E8E8FF',
  },
  dividerText: {
    marginHorizontal: 20,
    color: '#8B8BA3',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#4ECDC4',
  },
  forgotPasswordLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    marginTop: 25,
    paddingHorizontal: 20,
  },
  forgotPasswordIcon: {
    fontSize: 20,
    marginRight: 12,
    color: '#6C63FF',
  },
  forgotPasswordText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  featureGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    marginBottom: 20,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 8,
    color: '#6C63FF',
  },
  featureText: {
    fontSize: 13,
    color: '#6B6B8C',
    fontWeight: '500',
  },
  footerText: {
    color: '#8B8BA3',
    fontSize: 13,
    fontStyle: 'italic',
  },
});