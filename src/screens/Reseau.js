import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default function Reseau() {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.content}>
        <Text style={styles.header}>Réseau</Text>
        <Text style={styles.subtitle}>Page en construction...</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F4F6FA',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

