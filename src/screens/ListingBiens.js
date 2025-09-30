import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';

// Import the properties data
const biens = require('../assets/biens.json');

export default function ListingBiens({ navigation }) {
  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const renderPropertyItem = ({ item }) => (
    <View style={styles.propertyCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.propertyImage}
        resizeMode="cover"
      />
      <View style={styles.propertyInfo}>
        <Text style={styles.propertyTitle}>{item.title}</Text>
        <Text style={styles.propertyLocation}>{item.location.city} - {item.location.district}</Text>
        
        <View style={styles.propertyDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>📐</Text>
            <Text style={styles.detailText}>{item.area}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🛏️</Text>
            <Text style={styles.detailText}>{item.rooms.bedrooms}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailIcon}>🛁</Text>
            <Text style={styles.detailText}>{item.rooms.bathrooms}</Text>
          </View>
        </View>
        
        <Text style={styles.propertyPrice}>{item.price}</Text>
        
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Contacter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header with back arrow */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Les biens à la vente</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Properties List */}
      <FlatList
        data={biens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderPropertyItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    fontSize: 20,
    color: '#1A237E',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A237E',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  propertyCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EAF0',
    overflow: 'hidden',
  },
  propertyImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#E5E7EB',
  },
  propertyInfo: {
    padding: 16,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  propertyDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailIcon: {
    fontSize: 16,
  },
  detailText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
  },
  propertyPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 16,
  },
  contactButton: {
    backgroundColor: '#1A237E',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
