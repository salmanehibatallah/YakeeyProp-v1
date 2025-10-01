import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const leads = require('../assets/leads.json');

export default function Cagnotte({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('tous');
  const [animatedValues] = useState(
    leads.map(() => new Animated.Value(0))
  );

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  // Calculate totals
  const validatedLeads = leads.filter(lead => lead.status === 'validé');
  const totalEarnings = validatedLeads.reduce((sum, lead) => sum + lead.commission, 0);
  const pendingLeads = leads.filter(lead => lead.status === 'en_attente');
  const potentialEarnings = pendingLeads.reduce((sum, lead) => {
    const potentialCommission = parseFloat(lead.propertyPrice.replace(/[^\d]/g, '')) * lead.commissionRate / 100;
    return sum + potentialCommission;
  }, 0);

  const filters = [
    { key: 'tous', label: 'Tous', count: leads.length },
    { key: 'validé', label: 'Validés', count: validatedLeads.length },
    { key: 'en_attente', label: 'En attente', count: pendingLeads.length },
    { key: 'rejeté', label: 'Rejetés', count: leads.filter(l => l.status === 'rejeté').length }
  ];

  const filteredLeads = selectedFilter === 'tous' 
    ? leads 
    : leads.filter(lead => lead.status === selectedFilter);

  const getStatusColor = (status) => {
    switch (status) {
      case 'validé': return '#059669';
      case 'en_attente': return '#F59E0B';
      case 'rejeté': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'validé': return '✅';
      case 'en_attente': return '⏳';
      case 'rejeté': return '❌';
      default: return '📋';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-MA', {
      style: 'currency',
      currency: 'MAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('MAD', 'MAD');
  };

  const handleCardPress = (item, index) => {
    Animated.sequence([
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animatedValues[index], {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderLeadCard = ({ item, index }) => {
    const scale = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.95],
    });

    const isValidated = item.status === 'validé';
    const earnings = isValidated ? item.commission : 0;

    return (
      <Animated.View style={[styles.cardContainer, { transform: [{ scale }] }]}>
        <TouchableOpacity
          style={[
            styles.leadCard,
            { borderLeftColor: getStatusColor(item.status) }
          ]}
          onPress={() => handleCardPress(item, index)}
          activeOpacity={0.9}
        >
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.statusContainer}>
              <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
              <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1).replace('_', ' ')}
              </Text>
            </View>
            <View style={styles.earningsContainer}>
              <Text style={[
                styles.earningsAmount,
                { color: isValidated ? '#059669' : '#DC2626' }
              ]}>
                {isValidated ? `+${formatCurrency(earnings)}` : '0 MAD'}
              </Text>
            </View>
          </View>

          {/* Client Info */}
          <View style={styles.clientSection}>
            <Text style={styles.clientName}>{item.clientName}</Text>
            <Text style={styles.clientContact}>{item.clientEmail}</Text>
            <Text style={styles.clientContact}>{item.clientPhone}</Text>
          </View>

          {/* Property Info */}
          <View style={styles.propertySection}>
            <Text style={styles.propertyTitle}>{item.propertyTitle}</Text>
            <Text style={styles.propertyLocation}>📍 {item.propertyLocation}</Text>
            <Text style={styles.propertyPrice}>💰 {item.propertyPrice}</Text>
          </View>

          {/* Lead Details */}
          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Type:</Text>
              <Text style={styles.detailValue}>{item.leadType}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Soumis le:</Text>
              <Text style={styles.detailValue}>{formatDate(item.dateSubmitted)}</Text>
            </View>
            {item.dateValidated && (
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Validé le:</Text>
                <Text style={styles.detailValue}>{formatDate(item.dateValidated)}</Text>
              </View>
            )}
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Commission:</Text>
              <Text style={styles.detailValue}>{item.commissionRate}%</Text>
            </View>
          </View>

          {/* Notes */}
          {item.notes && (
            <View style={styles.notesSection}>
              <Text style={styles.notesLabel}>Notes:</Text>
              <Text style={styles.notesText}>{item.notes}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderFilterButton = (filter) => (
    <TouchableOpacity
      key={filter.key}
      style={[
        styles.filterButton,
        selectedFilter === filter.key && styles.filterButtonActive
      ]}
      onPress={() => setSelectedFilter(filter.key)}
    >
      <Text style={[
        styles.filterButtonText,
        selectedFilter === filter.key && styles.filterButtonTextActive
      ]}>
        {filter.label}
      </Text>
      <View style={[
        styles.filterBadge,
        selectedFilter === filter.key && styles.filterBadgeActive
      ]}>
        <Text style={[
          styles.filterBadgeText,
          selectedFilter === filter.key && styles.filterBadgeTextActive
        ]}>
          {filter.count}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Ma Cagnotte</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Balance Cards */}
        <View style={styles.balanceSection}>
          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceIcon}>💰</Text>
              <Text style={styles.balanceLabel}>Gains Validés</Text>
            </View>
            <Text style={styles.balanceAmount}>{formatCurrency(totalEarnings)}</Text>
            <Text style={styles.balanceSubtext}>
              {validatedLeads.length} lead{validatedLeads.length > 1 ? 's' : ''} validé{validatedLeads.length > 1 ? 's' : ''}
            </Text>
          </View>

          <View style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceIcon}>⏳</Text>
              <Text style={styles.balanceLabel}>Potentiel</Text>
            </View>
            <Text style={styles.potentialAmount}>{formatCurrency(potentialEarnings)}</Text>
            <Text style={styles.balanceSubtext}>
              {pendingLeads.length} lead{pendingLeads.length > 1 ? 's' : ''} en attente
            </Text>
          </View>
        </View>

        {/* Filters */}
        <View style={styles.filtersSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContainer}
          >
            {filters.map(renderFilterButton)}
          </ScrollView>
        </View>

        {/* Results Count */}
        <View style={styles.resultsSection}>
          <Text style={styles.resultsText}>
            {filteredLeads.length} lead{filteredLeads.length > 1 ? 's' : ''} trouvé{filteredLeads.length > 1 ? 's' : ''}
          </Text>
        </View>

        {/* Leads List */}
        <FlatList
          data={filteredLeads}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderLeadCard}
          scrollEnabled={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyTitle}>Aucun lead trouvé</Text>
              <Text style={styles.emptyText}>
                {selectedFilter === 'tous' 
                  ? 'Aucun lead disponible pour le moment.' 
                  : `Aucun lead ${selectedFilter.replace('_', ' ')} trouvé.`}
              </Text>
            </View>
          }
        />
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
  container: {
    flex: 1,
  },
  balanceSection: {
    flexDirection: 'row',
    padding: 16,
    gap: 12,
  },
  balanceCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  balanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  balanceIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  balanceLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  potentialAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  filtersSection: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  filterButtonActive: {
    backgroundColor: '#1A237E',
    borderColor: '#1A237E',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  filterBadge: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    minWidth: 24,
    alignItems: 'center',
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  filterBadgeText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: 'bold',
  },
  filterBadgeTextActive: {
    color: '#fff',
  },
  resultsSection: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  resultsText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  cardContainer: {
    marginBottom: 16,
  },
  leadCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F1F3',
    borderLeftWidth: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  earningsContainer: {
    alignItems: 'flex-end',
  },
  earningsAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  clientSection: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 4,
  },
  clientContact: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  propertySection: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  propertyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 6,
  },
  propertyLocation: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  propertyPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  detailsSection: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  notesSection: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  notesLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});
