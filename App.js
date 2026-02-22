import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';

/**
 * ARCHIVO: App.js
 * UBICACIÓN: Carpeta raíz de tu proyecto APPproyecto2026 en Android Studio.
 * PROYECTO: Policía360 - Seguridad Participativa Ecuador
 */

export default function App() {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlertas();
  }, []);

  const fetchAlertas = async () => {
    try {
      // Usamos la IP 10.0.2.2 para conectar el emulador con tu servidor de VS Code
      const response = await fetch('http://10.0.2.2:3000/api/v1/alertas', {
        headers: {
          'Authorization': 'proyecto2026_seguro' // Clave definida en tu Backend
        }
      });
      const json = await response.json();
      setAlertas(json.alertas);
    } catch (error) {
      console.error("Error conectando al servidor:", error);
      // Datos de respaldo por si el servidor está apagado
      setAlertas([
        { id: 1, titulo: "Operativo La Marín", descripcion: "Control de armas y documentos.", tipo: "Alerta" },
        { id: 2, titulo: "Feria de Seguridad", descripcion: "Capacitación en el UPC cercano.", tipo: "Info" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={[styles.indicator, { backgroundColor: item.tipo === 'Alerta' ? '#d9534f' : '#0275d8' }]} />
      <View style={styles.cardContent}>
        <Text style={styles.cardTag}>{item.tipo.toUpperCase()}</Text>
        <Text style={styles.cardTitle}>{item.titulo}</Text>
        <Text style={styles.cardDesc}>{item.descripcion}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#002b5b" />

      {/* Encabezado Institucional */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>POLICÍA 360</Text>
        <Text style={styles.headerSub}>Policía Nacional del Ecuador</Text>
      </View>

      {/* Funcionalidades Principales (Requisito E) */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: '#d9534f' }]}
          onPress={() => Alert.alert("Botón de Pánico", "Ubicación enviada al UPC más cercano.")}
        >
          <Text style={styles.btnText}>PÁNICO</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => Alert.alert("Denuncia", "Abriendo formulario anónimo...")}
        >
          <Text style={styles.btnText}>DENUNCIAR</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Alertas Comunitarias</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#002b5b" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Seguridad Ciudadana - Ecuador</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7f6' },
  header: { backgroundColor: '#002b5b', padding: 25, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  headerSub: { color: '#ffd700', fontSize: 13, textAlign: 'center', marginTop: 4, fontWeight: '600' },
  actionContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 20 },
  actionBtn: { backgroundColor: '#002b5b', padding: 18, borderRadius: 12, width: '45%', alignItems: 'center', elevation: 5 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 20, marginBottom: 10, color: '#333' },
  card: { backgroundColor: '#fff', borderRadius: 12, marginHorizontal: 20, marginBottom: 15, flexDirection: 'row', elevation: 2, overflow: 'hidden' },
  indicator: { width: 8 },
  cardContent: { padding: 15, flex: 1 },
  cardTag: { fontSize: 10, color: '#777', fontWeight: 'bold', marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#002b5b' },
  cardDesc: { fontSize: 14, color: '#555', marginTop: 5 },
  footer: { padding: 15, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee' },
  footerText: { fontSize: 11, color: '#999' }
});