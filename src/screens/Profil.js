import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function Profil() {
  const profileSections = [
    {
      title: 'Paramètres du compte',
      items: [
        { id: 'info', label: 'Mes informations', icon: '👤' },
        { id: 'preferences', label: 'Mes préférences', icon: '❤️' },
        { id: 'banking', label: 'Mes informations bancaires', icon: '🏛️' },
        { id: 'vdi', label: 'Contrat VDI', icon: '📄' },
      ]
    },
    {
      title: 'Mise à jour de mon profil professionnel',
      items: [
        { id: 'professional', label: 'Mon profil professionnel', icon: '👔' },
        { id: 'reviews', label: 'Mes avis', icon: '⭐', locked: true },
        { id: 'activate', label: 'Activer / Désactiver mon profil', icon: '🔄', locked: true },
      ]
    }
  ];

  const handleItemPress = (itemId) => {
    console.log('Pressed item:', itemId);
    // TODO: Navigate to specific screen based on itemId
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Header Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Hibatallah Salmane</Text>
            <Text style={styles.profileId}>Votre identifiant : 1078186</Text>
          </View>
        </View>

        {/* Profile Sections */}
        {profileSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionItems}>
              {section.items.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.menuItem,
                    item.locked && styles.menuItemLocked
                  ]}
                  onPress={() => handleItemPress(item.id)}
                  disabled={item.locked}
                >
                  <View style={styles.menuItemLeft}>
                    <View style={styles.menuIcon}>
                      <Text style={styles.menuIconText}>{item.icon}</Text>
                    </View>
                    <Text style={[
                      styles.menuLabel,
                      item.locked && styles.menuLabelLocked
                    ]}>
                      {item.label}
                    </Text>
                  </View>
                  <View style={styles.menuItemRight}>
                    {item.locked && <Text style={styles.lockIcon}>🔒</Text>}
                    <Text style={[
                      styles.menuArrow,
                      item.locked && styles.menuArrowLocked
                    ]}>
                      →
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  content: {
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#1A237E',
    margin: 16,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  profileIconText: {
    fontSize: 28,
    color: '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  profileId: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  sectionItems: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EAF0',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuItemLocked: {
    opacity: 0.6,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFF4E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuIconText: {
    fontSize: 18,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    flex: 1,
  },
  menuLabelLocked: {
    color: '#9CA3AF',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 14,
    marginRight: 8,
    opacity: 0.6,
  },
  menuArrow: {
    fontSize: 16,
    color: '#1A237E',
    fontWeight: 'bold',
  },
  menuArrowLocked: {
    color: '#9CA3AF',
  },
});

