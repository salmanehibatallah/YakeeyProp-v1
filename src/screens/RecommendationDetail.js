import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';

const STATUS_STEPS = [
  'Recommandation envoyée à YakeeyPro',
  'Recommandation envoyée au conseiller Yakeey',
  'En cours de traitement',
  'Validé',
];

const STATUS_COLORS = {
  'Recommandation envoyée à YakeeyPro': '#1A237E',
  'Recommandation envoyée au conseiller Yakeey': '#1976D2',
  'En cours de traitement': '#FFA000',
  'non validé': '#E53935',
  'Validé': '#388E3C',
};

export default function RecommendationDetail({ route }) {
  const reco = route?.params?.reco;
  if (!reco) return <SafeAreaView style={styles.safe}><Text>Recommandation introuvable.</Text></SafeAreaView>;

  // Find current step index
  const currentStep = STATUS_STEPS.findIndex(s => s === reco.status);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Détail de la recommandation</Text>
        <View style={styles.detailBox}>
          <Text style={styles.label}>Nom du contact</Text>
          <Text style={styles.value}>{reco.nom}</Text>
          <Text style={styles.label}>Type de projet</Text>
          <Text style={styles.value}>{reco.typeProjet}</Text>
          <Text style={styles.label}>Date de la recommandation</Text>
          <Text style={styles.value}>{reco.date}</Text>
          <Text style={styles.label}>Statut</Text>
          <Text style={[styles.value, { color: STATUS_COLORS[reco.status] || '#1A237E', fontWeight: 'bold' }]}>{reco.status}</Text>
        </View>
        <Text style={styles.sliderTitle}>Avancement</Text>
        <View style={styles.sliderRow}>
          {STATUS_STEPS.map((step, idx) => (
            <React.Fragment key={step}>
              <View style={[styles.sliderStep, idx <= currentStep ? styles.sliderStepActive : styles.sliderStepInactive]} />
              {idx < STATUS_STEPS.length - 1 && (
                <View style={[styles.sliderLine, idx < currentStep ? styles.sliderStepActive : styles.sliderStepInactive]} />
              )}
            </React.Fragment>
          ))}
        </View>
        <View style={styles.sliderLabelsRow}>
          {STATUS_STEPS.map((step, idx) => (
            <View key={step} style={{ width: 70, alignItems: 'center' }}>
              <Text
                style={[styles.sliderLabel, idx <= currentStep ? styles.sliderLabelActive : styles.sliderLabelInactive]}
                numberOfLines={2}
              >
                {step}
              </Text>
            </View>
          ))}
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
    padding: 18,
    paddingBottom: 40,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 18,
    textAlign: 'center',
  },
  detailBox: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },
  sliderTitle: {
    fontSize: 16,
    color: '#1A237E',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  sliderStep: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    backgroundColor: '#fff',
    borderColor: '#E0E0E0',
  },
  sliderStepActive: {
    borderColor: '#1A237E',
    backgroundColor: '#1A237E',
  },
  sliderStepInactive: {
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  sliderLine: {
    height: 2,
    flex: 1,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 2,
  },
  sliderLabel: {
    fontSize: 11,
    color: '#888',
    textAlign: 'center',
    width: 70,
  },
  sliderLabelActive: {
    color: '#1A237E',
    fontWeight: 'bold',
  },
  sliderLabelInactive: {
    color: '#888',
  },
});
