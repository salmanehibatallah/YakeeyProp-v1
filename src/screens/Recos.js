import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
} from 'react-native';

const STATUS_COLORS = {
  'Recommandation envoyée à YakeeyProp': '#1A237E',
  'Recommandation envoyée au conseiller Yakeey': '#1976D2',
  'en cours de traitement par le conseiller yakeey': '#FFA000',
  'non validé': '#E53935',
  'validé': '#388E3C',
};

// TODO: replace with real data
const MOCK_RECOS = [
  {
    id: '1',
    nom: 'Marie Dupont',
    typeProjet: 'Recherche de bien immobilier à acheter à Maarif',
    date: '2024-06-01',
    status: 'Recommandation envoyée à YakeeyProp',
  },
  {
    id: '2',
    nom: 'Ali Benali',
    typeProjet: 'Vente d’appartement à Gauthier',
    date: '2024-05-28',
    status: 'en cours de traitement par le conseiller yakeey',
  },
  {
    id: '3',
    nom: 'Sanae El Fassi',
    typeProjet: 'Location villa à Californie',
    date: '2024-05-20',
    status: 'validé',
  },
  {
    id: '4',
    nom: 'Youssef Amrani',
    typeProjet: 'Recherche bureau à louer à Casa Finance City',
    date: '2024-05-15',
    status: 'non validé',
  },
];

export default function Recos({ navigation }) {
  const [search, setSearch] = useState('');
  const filtered = MOCK_RECOS.filter(
    r =>
      r.nom.toLowerCase().includes(search.toLowerCase()) ||
      r.typeProjet.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerBox}>
        <Text style={styles.header}>Recommandations</Text>
      </View>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 32 }}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
            onPress={() => navigation && navigation.navigate && navigation.navigate('RecommendationDetail', { reco: item })}
          >
            <View style={styles.cardRow}>
              <Text style={styles.cardName}>{item.nom}</Text>
              <View style={[styles.statusTag, { backgroundColor: STATUS_COLORS[item.status] || '#1A237E' }]}> 
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            <Text style={styles.cardType}>{item.typeProjet}</Text>
            <Text style={styles.cardDate}>{item.date}</Text>
          </Pressable>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>Aucune recommandation trouvée.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  headerBox: {
    paddingTop: 18,
    paddingBottom: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  searchBox: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  cardPressed: {
    opacity: 0.7,
    backgroundColor: '#F4F6FA',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  statusTag: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardType: {
    fontSize: 14,
    color: '#333',
    marginBottom: 2,
  },
  cardDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
});
