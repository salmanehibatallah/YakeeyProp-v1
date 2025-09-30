import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.box}>
        <Text style={styles.appTitle}>YakeeyProp</Text>
        <Image
          source={require('../assets/agreement.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.marketingLine1}>
          Vous connaissez quelqu'un qui veut acheter ou vendre un bien immobilier ?
        </Text>
        <Text style={styles.marketingLine2}>
          Recommandez-le sur Yakeey et gagnez une bonne rémunération.
        </Text>
        <View style={styles.ctaGroup}>
          <TouchableOpacity style={[styles.ctaButton, styles.ctaButtonSecondary]} onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.ctaText, styles.ctaTextSecondary]}>Je me connecte</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.ctaButton, styles.ctaButtonPrimary]} onPress={() => navigation.navigate('Signup')}>
            <Text style={[styles.ctaText, styles.ctaTextPrimary]}>Je crée un compte</Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 70,
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
    marginBottom: 32,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  icon: {
    width: 90,
    height: 90,
    marginBottom: 28,
  },
  marketingLine1: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 8,
    fontWeight: '500',
    lineHeight: 28,
  },
  marketingLine2: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 26,
  },
  ctaGroup: {
    width: '100%',
    marginTop: 12,
    gap: 14,
  },
  ctaButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 0,
    borderWidth: 2,
  },
  ctaButtonSecondary: {
    backgroundColor: 'white',
    borderColor: '#1A237E',
  },
  ctaButtonPrimary: {
    backgroundColor: '#1A237E',
    borderColor: '#1A237E',
    marginTop: 0,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  ctaTextSecondary: {
    color: '#1A237E',
  },
  ctaTextPrimary: {
    color: 'white',
  },
});
