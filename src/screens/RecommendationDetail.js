import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const STATUS_STEPS = [
  {
    key: 'Recommandation envoyée à YakeeyProp',
    label: 'Recommandation envoyée à YakeeyProp',
    shortLabel: 'Recommandation envoyée',
    color: '#1A237E'
  },
  {
    key: 'Recommandation envoyée au conseiller Yakeey',
    label: 'Recommandation envoyée au conseiller Yakeey',
    shortLabel: 'Conseiller assigné',
    color: '#1976D2'
  },
  {
    key: 'en cours de traitement par le conseiller yakeey',
    label: 'En cours de traitement par le conseiller yakeey',
    shortLabel: 'En cours de traitement',
    color: '#FFA000'
  },
  {
    key: 'validé',
    label: 'Validé',
    shortLabel: 'Validé',
    color: '#388E3C'
  },
];

const STATUS_COLORS = {
  'Recommandation envoyée à YakeeyProp': '#1A237E',
  'Recommandation envoyée au conseiller Yakeey': '#1976D2',
  'en cours de traitement par le conseiller yakeey': '#FFA000',
  'non validé': '#E53935',
  'validé': '#388E3C',
};

export default function RecommendationDetail({ route, navigation }) {
  const reco = route?.params?.reco;
  if (!reco) return <SafeAreaView style={styles.safe}><Text>Recommandation introuvable.</Text></SafeAreaView>;

  // Find current step index
  const currentStep = STATUS_STEPS.findIndex(s => s.key === reco.status);

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header with back arrow */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Détail de la recommandation</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Lead Information Card */}
        <View style={styles.leadCard}>
          <View style={styles.leadHeader}>
            <View style={styles.profileIcon}>
              <Text style={styles.profileIconText}>👤</Text>
            </View>
            <View style={styles.leadInfo}>
              <Text style={styles.leadName}>{reco.nom}</Text>
              <Text style={styles.leadDate}>Recommandé le {reco.date}</Text>
            </View>
          </View>
          
          <View style={styles.projectSection}>
            <Text style={styles.projectLabel}>PROJET IMMOBILIER</Text>
            <Text style={styles.projectText}>{reco.typeProjet}</Text>
          </View>

          <View style={styles.statusSection}>
            <Text style={styles.statusLabel}>STATUT ACTUEL</Text>
            <View style={[styles.currentStatusBadge, { backgroundColor: STATUS_COLORS[reco.status] || '#1A237E' }]}>
              <Text style={styles.currentStatusText}>{reco.status}</Text>
            </View>
          </View>
        </View>

        {/* Vertical Progress Section */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Avancement du dossier</Text>
          
          <View style={styles.verticalProgress}>
            {STATUS_STEPS.map((step, idx) => {
              const isActive = idx <= currentStep;
              const isCurrent = idx === currentStep;
              
              return (
                <View key={step.key} style={styles.progressItem}>
                  <View style={styles.progressLeft}>
                    <View style={[
                      styles.progressDot,
                      isActive ? styles.progressDotActive : styles.progressDotInactive,
                    ]}>
                      {isActive && <Text style={styles.progressDotCheck}>✓</Text>}
                    </View>
                    {idx < STATUS_STEPS.length - 1 && (
                      <View style={[
                        styles.progressLine,
                        isActive ? styles.progressLineActive : styles.progressLineInactive
                      ]} />
                    )}
                  </View>
                  
                  <View style={styles.progressContent}>
                    <Text style={[
                      styles.progressLabel,
                      isActive ? styles.progressLabelActive : styles.progressLabelInactive
                    ]}>
                      {step.label}
                    </Text>
                    {isCurrent && (
                      <Text style={styles.currentStatusIndicator}>En cours</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
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
  content: {
    padding: 16,
    paddingBottom: 40,
  },
  leadCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EAF0',
  },
  leadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E3E6F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  profileIconText: {
    fontSize: 24,
    color: '#1A237E',
  },
  leadInfo: {
    flex: 1,
  },
  leadName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 4,
  },
  leadDate: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  projectSection: {
    backgroundColor: '#F8F9FB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1A237E',
  },
  projectLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  projectText: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 22,
    fontWeight: '500',
  },
  statusSection: {
    marginTop: 4,
  },
  statusLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  currentStatusBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  currentStatusText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EAF0',
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 20,
  },
  verticalProgress: {
    paddingLeft: 8,
  },
  progressItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  progressLeft: {
    alignItems: 'center',
    marginRight: 16,
  },
  progressDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  progressDotActive: {
    borderColor: '#1A237E',
    backgroundColor: '#1A237E',
  },
  progressDotInactive: {
    borderColor: '#D1D5DB',
    backgroundColor: '#fff',
  },
  progressDotCheck: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  progressLine: {
    width: 2,
    height: 40,
    marginTop: 4,
  },
  progressLineActive: {
    backgroundColor: '#1A237E',
  },
  progressLineInactive: {
    backgroundColor: '#D1D5DB',
  },
  progressContent: {
    flex: 1,
    paddingTop: 2,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  progressLabelActive: {
    color: '#1A237E',
  },
  progressLabelInactive: {
    color: '#9CA3AF',
  },
  currentStatusIndicator: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
    fontStyle: 'italic',
  },
});



