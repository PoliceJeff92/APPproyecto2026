import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Alert, KeyboardAvoidingView,
  Platform, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = () => {
    if (!email.trim()) {
      setError('El correo electrónico es obligatorio');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Formato de correo no válido');
      return false;
    }
    setError('');
    return true;
  };

  const handleSendResetLink = () => {
    if (!validateEmail()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setEmailSent(true);
      Alert.alert(
        'Enlace Enviado',
        'Revisa tu bandeja de entrada para continuar',
        [{ text: 'Entendido' }]
      );
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.illustration}>
          <View style={styles.iconCircle}>
            <Text style={styles.icon}>🔐</Text>
          </View>
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Recupera tu Acceso</Text>
          <Text style={styles.subtitle}>
            Te ayudaremos a restablecer tu contraseña de manera segura
          </Text>
        </View>

        {emailSent ? (
          <View style={styles.successCard}>
            <View style={styles.successCircle}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <Text style={styles.successTitle}>¡Listo!</Text>
            <Text style={styles.successMessage}>
              Hemos enviado las instrucciones a:
            </Text>
            <View style={styles.emailDisplay}>
              <Text style={styles.emailText}>{email}</Text>
            </View>
            <Text style={styles.instructions}>
              Sigue los pasos indicados en el correo para continuar
            </Text>
            
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => setEmailSent(false)}
              >
                <Text style={styles.secondaryButtonText}>Ingresar otro correo</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <>
            <View style={styles.formContainer}>
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Tu Correo Electrónico</Text>
                <View style={styles.inputWithIcon}>
                  <Text style={styles.inputIcon}>📧</Text>
                  <TextInput
                    style={[styles.input, error && styles.inputError]}
                    placeholder="ejemplo@correo.com"
                    placeholderTextColor="#A0A0C0"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      if (error) setError('');
                    }}
                    editable={!isLoading}
                  />
                </View>
                {error && <Text style={styles.errorText}>{error}</Text>}
              </View>

              <TouchableOpacity
                style={[styles.primaryButton, isLoading && styles.buttonDisabled]}
                onPress={handleSendResetLink}
                disabled={isLoading}
              >
                <Text style={styles.buttonIcon}>🔗</Text>
                <Text style={styles.primaryButtonText}>
                  {isLoading ? 'Enviando...' : 'Enviar Enlace de Recuperación'}
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.backIcon}>←</Text>
          <Text style={styles.backText}>Volver al inicio de sesión</Text>
        </TouchableOpacity>

        <View style={styles.securityNote}>
          <Text style={styles.securityIcon}>🛡️</Text>
          <Text style={styles.securityText}>
            Tu información está protegida con encriptación de extremo a extremo
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 30,
    backgroundColor: '#F5F7FF',
    justifyContent: 'center',
  },
  illustration: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'linear-gradient(135deg, #6C63FF 0%, #8A2BE2 100%)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  icon: {
    fontSize: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D3047',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B6B8C',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  formContainer: {
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4A4A6A',
    marginBottom: 12,
    paddingLeft: 5,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E8E8FF',
    overflow: 'hidden',
  },
  inputIcon: {
    fontSize: 20,
    paddingHorizontal: 20,
    color: '#6C63FF',
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    paddingRight: 20,
    fontSize: 16,
    color: '#2D3047',
  },
  inputError: {
    borderColor: '#FF6B6B',
  },
  errorText: {
    color: '#FF6B6B',
    fontSize: 14,
    marginTop: 8,
    paddingLeft: 5,
  },
  primaryButton: {
    flexDirection: 'row',
    backgroundColor: 'linear-gradient(135deg, #6C63FF 0%, #8A2BE2 100%)',
    paddingVertical: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 6,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonIcon: {
    fontSize: 22,
    marginRight: 12,
    color: 'white',
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  successCard: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 35,
    borderRadius: 25,
    marginBottom: 30,
    shadowColor: '#4ECDC4',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#4ECDC4',
    borderStyle: 'solid',
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkmark: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  successTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2D3047',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: '#6B6B8C',
    marginBottom: 15,
    textAlign: 'center',
  },
  emailDisplay: {
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#D6E4FF',
  },
  emailText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3047',
    textAlign: 'center',
  },
  instructions: {
    fontSize: 14,
    color: '#6B6B8C',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 15,
  },
  secondaryButton: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  secondaryButtonText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginBottom: 30,
  },
  backIcon: {
    fontSize: 20,
    color: '#6C63FF',
    marginRight: 10,
  },
  backText: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FF',
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#C2E0FF',
  },
  securityIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  securityText: {
    flex: 1,
    fontSize: 14,
    color: '#4A6FA5',
    lineHeight: 20,
  },
});