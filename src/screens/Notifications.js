import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Notifications() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Mes notifications</Text>
        </View>

        {/* Empty State */}
        <View style={styles.emptyStateContainer}>
          <View style={styles.emptyStateIcon}>
            <Text style={styles.emptyStateIconText}>🔔</Text>
          </View>
          <Text style={styles.emptyStateTitle}>Aucune notification</Text>
          <Text style={styles.emptyStateSubtitle}>
            Vous n'avez pas encore reçu de notifications.{'\n'}
            Nous vous tiendrons informé des mises à jour importantes.
          </Text>
        </View>
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
    flexGrow: 1,
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
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 60,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E3E6F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  emptyStateIconText: {
    fontSize: 40,
    opacity: 0.6,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A237E',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
});

