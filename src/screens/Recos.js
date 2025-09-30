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
        <Text style={styles.header}>Mes recommandations</Text>
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
            {/* Header with profile and status */}
            <View style={styles.cardHeader}>
              <View style={styles.profileSection}>
                <View style={styles.profileIcon}>
                  <Text style={styles.profileIconText}>👤</Text>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.cardName}>{item.nom}</Text>
                  <Text style={styles.cardDate}>Recommandé le {item.date}</Text>
                </View>
              </View>
              <View style={[styles.statusTag, { backgroundColor: STATUS_COLORS[item.status] || '#1A237E' }]}> 
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>
            
            {/* Project details */}
            <View style={styles.projectSection}>
              <Text style={styles.projectLabel}>Projet immobilier :</Text>
              <Text style={styles.cardType}>{item.typeProjet}</Text>
            </View>
            
            {/* Action indicator */}
            <View style={styles.actionIndicator}>
              <Text style={styles.actionText}>Appuyez pour voir les détails</Text>
              <Text style={styles.actionArrow}>→</Text>
            </View>
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
    alignItems: 'flex-start',
    paddingHorizontal: 16,
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
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EAF0',
  },
  cardPressed: {
    opacity: 0.8,
    backgroundColor: '#F8F9FB',
    transform: [{ scale: 0.98 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    marginRight: 12,
  },
  profileIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E3E6F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  profileIconText: {
    fontSize: 20,
    color: '#1A237E',
  },
  profileInfo: {
    flex: 1,
    paddingTop: 2,
  },
  cardName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statusTag: {
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    maxWidth: 120,
  },
  statusText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 12,
  },
  projectSection: {
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#1A237E',
  },
  projectLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardType: {
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 20,
    fontWeight: '500',
  },
  actionIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionText: {
    fontSize: 13,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  actionArrow: {
    fontSize: 16,
    color: '#1A237E',
    fontWeight: 'bold',
  },
});
