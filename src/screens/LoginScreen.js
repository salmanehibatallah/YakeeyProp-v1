import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.box}>
        <Text style={styles.title}>Connexion</Text>
        <Text style={styles.subtitle}>Connectez-vous à votre compte</Text>
        <TextInput
          style={styles.input}
          placeholder="votre@email.com"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('MainTabs')}>
          <Text style={styles.ctaText}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ctaButtonSecondary} onPress={() => navigation && navigation.goBack && navigation.goBack()}>
          <Text style={styles.ctaTextSecondary}>Retour</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  box: {
    paddingVertical: 40,
    paddingHorizontal: 28,
    borderRadius: 20,
    backgroundColor: 'white',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    alignItems: 'center',
    width: 370,
    maxWidth: '100%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1.1,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 28,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#222',
  },
  ctaButton: {
    width: '100%',
    backgroundColor: '#1A237E',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 10,
  },
  ctaText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  ctaButtonSecondary: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1A237E',
  },
  ctaTextSecondary: {
    color: '#1A237E',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
