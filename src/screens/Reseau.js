import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function Reseau() {
  const [activeTab, setActiveTab] = useState('mon-reseau');

  const tabs = [
    { id: 'mon-reseau', label: 'Mon réseau', icon: '👥' },
    { id: 'parrainer', label: 'Parrainer un tipser', icon: '🔗' },
    { id: 'afterwork', label: 'Afterwork by Yakeey', icon: '🎉' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mon-reseau':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.emptyStateText}>Votre réseau est en cours de construction</Text>
            <Text style={styles.emptyStateSubtext}>Invitez des contacts pour développer votre réseau professionnel</Text>
          </View>
        );
      case 'parrainer':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.emptyStateText}>Parrainez un tipser</Text>
            <Text style={styles.emptyStateSubtext}>Recommandez des professionnels de confiance et gagnez des récompenses</Text>
          </View>
        );
      case 'afterwork':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.emptyStateText}>Afterwork by Yakeey</Text>
            <Text style={styles.emptyStateSubtext}>Participez aux événements networking organisés par Yakeey</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Mon réseau</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileIcon}>
            <Text style={styles.profileIconText}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Hibatallah Salmane</Text>
            <Text style={styles.profileId}>Votre identifiant : 1078186</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tabItem,
                activeTab === tab.id && styles.tabItemActive
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <View style={styles.tabIconContainer}>
                <Text style={styles.tabIcon}>{tab.icon}</Text>
              </View>
              <Text style={[
                styles.tabLabel,
                activeTab === tab.id && styles.tabLabelActive
              ]}>
                {tab.label}
              </Text>
              <Text style={styles.tabArrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Tab Content */}
        {renderTabContent()}
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
  headerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
    textAlign: 'left',
  },
  profileCard: {
    backgroundColor: 'linear-gradient(135deg, #1A237E 0%, #0EA5E9 100%)',
    backgroundColor: '#1A237E',
    margin: 16,
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
  tabsContainer: {
    margin: 16,
    marginTop: 8,
  },
  tabItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EAF0',
  },
  tabItemActive: {
    backgroundColor: '#F0F4FF',
    borderColor: '#1A237E',
    borderWidth: 2,
  },
  tabIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF4E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tabIcon: {
    fontSize: 20,
  },
  tabLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  tabLabelActive: {
    color: '#1A237E',
    fontWeight: 'bold',
  },
  tabArrow: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: 'bold',
  },
  tabContent: {
    margin: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EAF0',
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A237E',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

