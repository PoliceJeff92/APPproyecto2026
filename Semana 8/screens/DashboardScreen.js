// screens/DashboardScreen.js - DISEÑO COMPLETAMENTE NUEVO
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function DashboardScreen() {
  const navigation = useNavigation();
  const { user, userData, logout, updateUserData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            setUserDetails(data);
            updateUserData(data);
          }
        } catch (error) {
          console.error('Error al cargar datos:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleLogout = async () => {
    Alert.alert(
      'Salir del Sistema',
      '¿Confirmas que deseas finalizar tu sesión?',
      [
        { text: 'No, permanecer', style: 'cancel' },
        { 
          text: 'Sí, salir', 
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              const result = await logout();
              if (result.success) {
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Home' }]
                });
              } else {
                Alert.alert('Error', 'No se pudo cerrar la sesión');
              }
            } catch (error) {
              Alert.alert('Error', error.message);
            }
          }
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8A2BE2" />
        <Text style={styles.loadingText}>Preparando tu espacio...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mi Espacio Personal</Text>
        <Text style={styles.subtitle}>Gestiona tu cuenta y opciones</Text>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {userDetails?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
            </Text>
          </View>
          <View style={styles.statusIndicator} />
        </View>
        
        <Text style={styles.userName}>
          {userDetails?.name || user?.email?.split('@')[0] || 'Usuario'}
        </Text>
        
        <Text style={styles.userEmail}>{user?.email}</Text>
        
        <View style={[
          styles.roleBadge,
          userDetails?.role === 'admin' ? styles.adminBadge : styles.userBadge
        ]}>
          <Text style={styles.roleText}>
            {userDetails?.role === 'admin' ? 'ADMINISTRADOR' : 'MIEMBRO'}
          </Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>👤</Text>
          </View>
          <Text style={styles.statNumber}>Activa</Text>
          <Text style={styles.statLabel}>Sesión</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Text style={styles.statIcon}>🔑</Text>
          </View>
          <Text style={styles.statNumber}>
            {userDetails?.role === 'admin' ? 'Total' : 'Básico'}
          </Text>
          <Text style={styles.statLabel}>Privilegios</Text>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Acciones Disponibles</Text>
        
        <TouchableOpacity style={styles.actionCard}>
          <View style={styles.actionIcon}>
            <Text>📄</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Mi Perfil</Text>
            <Text style={styles.actionSubtitle}>Ver y editar información</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionCard}>
          <View style={styles.actionIcon}>
            <Text>⚙️</Text>
          </View>
          <View style={styles.actionContent}>
            <Text style={styles.actionTitle}>Configuración</Text>
            <Text style={styles.actionSubtitle}>Ajustes de la cuenta</Text>
          </View>
          <Text style={styles.actionArrow}>›</Text>
        </TouchableOpacity>
        
        {userDetails?.role === 'admin' && (
          <TouchableOpacity style={[styles.actionCard, styles.adminAction]}>
            <View style={styles.actionIcon}>
              <Text>👥</Text>
            </View>
            <View style={styles.actionContent}>
              <Text style={styles.actionTitle}>Gestión de Usuarios</Text>
              <Text style={styles.actionSubtitle}>Panel administrativo</Text>
            </View>
            <Text style={styles.actionArrow}>›</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>

      <Text style={styles.footerNote}>
        Último acceso: {new Date().toLocaleDateString('es-ES', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 25,
    backgroundColor: '#F8F9FF',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: '#6C63FF',
    fontFamily: 'System',
  },
  header: {
    alignItems: 'center',
    marginBottom: 35,
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#2D3047',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8B8BA3',
    fontWeight: '500',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 25,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F0F0FF',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'linear-gradient(135deg, #6C63FF 0%, #8A2BE2 100%)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  avatarText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
  },
  statusIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CD964',
    borderWidth: 3,
    borderColor: 'white',
  },
  userName: {
    fontSize: 26,
    fontWeight: '700',
    color: '#2D3047',
    marginBottom: 6,
    textAlign: 'center',
  },
  userEmail: {
    fontSize: 16,
    color: '#8B8BA3',
    marginBottom: 20,
    textAlign: 'center',
  },
  roleBadge: {
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 25,
    minWidth: 150,
  },
  adminBadge: {
    backgroundColor: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)',
  },
  userBadge: {
    backgroundColor: 'linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)',
  },
  roleText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
  statIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statIcon: {
    fontSize: 28,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D3047',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#8B8BA3',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    height: 50,
    backgroundColor: '#F0F0FF',
    marginHorizontal: 20,
  },
  actionsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2D3047',
    marginBottom: 20,
    paddingLeft: 10,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  adminAction: {
    borderColor: '#FFEAA7',
    backgroundColor: '#FFF9E6',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#F0F0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D3047',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#8B8BA3',
  },
  actionArrow: {
    fontSize: 24,
    color: '#6C63FF',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 18,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  logoutIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  logoutText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: '700',
  },
  footerNote: {
    textAlign: 'center',
    fontSize: 13,
    color: '#8B8BA3',
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
});