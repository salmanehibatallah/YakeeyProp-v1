import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from 'react-native';

const tipsers = require('../assets/tipsers.json');
const afterworks = require('../assets/afterworks.json');

export default function Reseau({ navigation }) {
  const [activeTab, setActiveTab] = useState('mon-reseau');
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    ville: '',
    profession: '',
    experience: '',
    motivation: '',
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const scrollRef = useRef();
  const [animatedValues] = useState(
    [...tipsers, ...afterworks].map(() => new Animated.Value(0))
  );

  const tabs = [
    { id: 'mon-reseau', label: 'Mon réseau', icon: '👥' },
    { id: 'afterwork', label: 'Afterwork by Yakeey', icon: '🎉' },
  ];

  const filteredTipsers = tipsers.filter(tipser =>
    tipser.name.toLowerCase().includes(search.toLowerCase()) ||
    tipser.city.toLowerCase().includes(search.toLowerCase()) ||
    tipser.profession.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = () => {
    setModalVisible(true);
    setTouched({});
    setErrors({});
  };

  const closeModal = () => {
    setModalVisible(false);
    setForm({
      nom: '',
      prenom: '',
      telephone: '',
      email: '',
      ville: '',
      profession: '',
      experience: '',
      motivation: '',
    });
    setTouched({});
    setErrors({});
  };

  const handleFormChange = (key, value) => {
    setForm({ ...form, [key]: value });
    setTouched({ ...touched, [key]: true });
    setErrors({ ...errors, [key]: undefined });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nom) newErrors.nom = true;
    if (!form.prenom) newErrors.prenom = true;
    if (!form.telephone) newErrors.telephone = true;
    if (!form.email) newErrors.email = true;
    if (!form.ville) newErrors.ville = true;
    if (!form.profession) newErrors.profession = true;
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    setTouched({
      nom: true,
      prenom: true,
      telephone: true,
      email: true,
      ville: true,
      profession: true,
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    console.log('Parrainage soumis:', form);
    closeModal();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    return status === 'actif' ? '#059669' : '#F59E0B';
  };

  const getStatusIcon = (status) => {
    return status === 'actif' ? '🟢' : '🟡';
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

  const renderTipserCard = ({ item, index }) => {
    const scale = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.95],
    });

    return (
      <Animated.View style={[styles.cardContainer, { transform: [{ scale }] }]}>
        <TouchableOpacity
          style={styles.tipserCard}
          onPress={() => handleCardPress(item, index)}
          activeOpacity={0.9}
        >
          {/* Header avec avatar et statut */}
          <View style={styles.cardHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: item.avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusIcon}>{getStatusIcon(item.status)}</Text>
              </View>
            </View>
            
            <View style={styles.basicInfo}>
              <Text style={styles.tipserName}>{item.name}</Text>
              <Text style={styles.profession}>{item.profession}</Text>
              <Text style={styles.location}>📍 {item.district}, {item.city}</Text>
              <Text style={styles.experience}>⏱️ {item.experience} d'expérience</Text>
            </View>
          </View>

          {/* Stats section */}
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{item.totalEarnings} MAD</Text>
              <Text style={styles.statLabel}>Gains totaux</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{item.leadsGenerated}</Text>
              <Text style={styles.statLabel}>Leads générés</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{item.commission} MAD</Text>
              <Text style={styles.statLabel}>Ma commission</Text>
            </View>
          </View>

          {/* Details section */}
          <View style={styles.detailsSection}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Parrainé le:</Text>
              <Text style={styles.detailValue}>{formatDate(item.dateParraine)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Spécialité:</Text>
              <Text style={styles.detailValue}>{item.speciality}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Dernière activité:</Text>
              <Text style={styles.detailValue}>{formatDate(item.lastActivity)}</Text>
            </View>
          </View>

          {/* Contact section */}
          <View style={styles.contactSection}>
            <TouchableOpacity style={styles.contactButton}>
              <Text style={styles.contactIcon}>📞</Text>
              <Text style={styles.contactText}>Contacter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.messageButton}>
              <Text style={styles.messageIcon}>💬</Text>
              <Text style={styles.messageText}>Message</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderAfterworkCard = ({ item, index }) => {
    const scale = animatedValues[index + tipsers.length].interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.95],
    });

    const attendancePercentage = (item.attendees / item.maxAttendees) * 100;
    const isAlmostFull = attendancePercentage > 80;

    return (
      <Animated.View style={[styles.cardContainer, { transform: [{ scale }] }]}>
        <TouchableOpacity
          style={styles.afterworkCard}
          onPress={() => handleCardPress(item, index + tipsers.length)}
          activeOpacity={0.9}
        >
          {/* Image with overlay */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.image }}
              style={styles.afterworkImage}
              resizeMode="cover"
            />
            <View style={styles.imageOverlay} />
            
            {/* Category badge */}
            <View style={[styles.categoryBadge, { backgroundColor: '#1A237E' }]}>
              <Text style={styles.categoryText}>{item.category}</Text>
            </View>
            
            {/* Almost full badge */}
            {isAlmostFull && (
              <View style={styles.almostFullBadge}>
                <Text style={styles.almostFullText}>Presque complet!</Text>
              </View>
            )}
          </View>

          {/* Card content */}
          <View style={styles.afterworkContent}>
            <Text style={styles.afterworkTitle}>{item.title}</Text>
            <Text style={styles.afterworkDescription} numberOfLines={2}>
              {item.description}
            </Text>

            {/* Date and location */}
            <View style={styles.afterworkDetails}>
              <Text style={styles.afterworkDate}>📅 {formatDate(item.date)} à {item.time}</Text>
              <Text style={styles.afterworkLocation}>📍 {item.location.venue}</Text>
            </View>

            {/* Bottom info */}
            <View style={styles.afterworkBottom}>
              <Text style={styles.afterworkPrice}>{item.price}</Text>
              <Text style={styles.afterworkAttendees}>
                {item.attendees}/{item.maxAttendees} participants
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderMonReseauContent = () => (
    <View style={styles.tabContent}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un tipser..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* CTA Button */}
      <TouchableOpacity style={styles.ctaButton} onPress={openModal}>
        <Text style={styles.ctaButtonText}>+ Parrainer un tipser</Text>
      </TouchableOpacity>

      {/* Stats Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Mon réseau</Text>
        <View style={styles.summaryStats}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>{tipsers.length}</Text>
            <Text style={styles.summaryLabel}>Tipsers parrainés</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryValue}>
              {tipsers.reduce((sum, t) => sum + t.commission, 0)} MAD
            </Text>
            <Text style={styles.summaryLabel}>Commissions totales</Text>
          </View>
        </View>
      </View>

      {/* Results count */}
      <Text style={styles.resultsText}>
        {filteredTipsers.length} tipser{filteredTipsers.length > 1 ? 's' : ''} trouvé{filteredTipsers.length > 1 ? 's' : ''}
      </Text>

      {/* Tipsers List */}
      <FlatList
        data={filteredTipsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTipserCard}
        scrollEnabled={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>👥</Text>
            <Text style={styles.emptyTitle}>Aucun tipser trouvé</Text>
            <Text style={styles.emptyText}>
              {search ? 'Essayez de modifier votre recherche.' : 'Commencez par parrainer votre premier tipser !'}
            </Text>
          </View>
        }
      />
    </View>
  );

  const renderAfterworkContent = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Afterwork by Yakeey</Text>
      <Text style={styles.sectionSubtitle}>
        Participez aux événements networking organisés par Yakeey
      </Text>
      
      <FlatList
        data={afterworks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAfterworkCard}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'mon-reseau':
        return renderMonReseauContent();
      case 'afterwork':
        return renderAfterworkContent();
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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

      {/* Modal for parrainage */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={{ width: '100%', alignItems: 'center' }}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContent}>
                  <ScrollView ref={scrollRef} keyboardShouldPersistTaps="handled">
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Parrainer un tipser</Text>
                      <TouchableOpacity onPress={closeModal} hitSlop={{top:10,left:10,bottom:10,right:10}}>
                        <Text style={styles.modalClose}>×</Text>
                      </TouchableOpacity>
                    </View>
                    
                    <View style={styles.modalDescription}>
                      <Text style={styles.modalDescriptionTitle}>Pourquoi parrainer un ami ?</Text>
                      <Text style={styles.modalDescriptionText}>
                        Avec properties, tout le monde est gagnant. Quand vos proches gagnent de l'argent, vous êtes aussi rémunéré !
                      </Text>
                    </View>

                    <Text style={styles.modalLabel}>Nom</Text>
                    <TextInput
                      style={[styles.modalInput, errors.nom && touched.nom && styles.inputError]}
                      placeholder="Nom de famille"
                      placeholderTextColor="#888"
                      value={form.nom}
                      onChangeText={v => handleFormChange('nom', v)}
                      returnKeyType="next"
                    />

                    <Text style={styles.modalLabel}>Prénom</Text>
                    <TextInput
                      style={[styles.modalInput, errors.prenom && touched.prenom && styles.inputError]}
                      placeholder="Prénom"
                      placeholderTextColor="#888"
                      value={form.prenom}
                      onChangeText={v => handleFormChange('prenom', v)}
                      returnKeyType="next"
                    />

                    <Text style={styles.modalLabel}>Téléphone</Text>
                    <TextInput
                      style={[styles.modalInput, errors.telephone && touched.telephone && styles.inputError]}
                      placeholder="+212 6XX XXX XXX"
                      placeholderTextColor="#888"
                      keyboardType="phone-pad"
                      value={form.telephone}
                      onChangeText={v => handleFormChange('telephone', v)}
                      returnKeyType="next"
                    />

                    <Text style={styles.modalLabel}>Email</Text>
                    <TextInput
                      style={[styles.modalInput, errors.email && touched.email && styles.inputError]}
                      placeholder="email@exemple.com"
                      placeholderTextColor="#888"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={form.email}
                      onChangeText={v => handleFormChange('email', v)}
                      returnKeyType="next"
                    />

                    <Text style={styles.modalLabel}>Ville</Text>
                    <TextInput
                      style={[styles.modalInput, errors.ville && touched.ville && styles.inputError]}
                      placeholder="Ville de résidence"
                      placeholderTextColor="#888"
                      value={form.ville}
                      onChangeText={v => handleFormChange('ville', v)}
                      returnKeyType="next"
                    />

                    <Text style={styles.modalLabel}>Profession</Text>
                    <TextInput
                      style={[styles.modalInput, errors.profession && touched.profession && styles.inputError]}
                      placeholder="Agent immobilier, Courtier, etc."
                      placeholderTextColor="#888"
                      value={form.profession}
                      onChangeText={v => handleFormChange('profession', v)}
                      returnKeyType="next"
                    />

                    <Text style={styles.modalLabel}>Expérience (optionnel)</Text>
                    <TextInput
                      style={styles.modalInput}
                      placeholder="Nombre d'années d'expérience"
                      placeholderTextColor="#888"
                      value={form.experience}
                      onChangeText={v => handleFormChange('experience', v)}
                      returnKeyType="next"
                    />

                    <Text style={styles.modalLabel}>Motivation (optionnel)</Text>
                    <TextInput
                      style={[styles.modalInput, { height: 70, textAlignVertical: 'top' }]}
                      placeholder="Pourquoi recommandez-vous cette personne ?"
                      placeholderTextColor="#888"
                      multiline
                      value={form.motivation}
                      onChangeText={v => handleFormChange('motivation', v)}
                    />

                    <TouchableOpacity style={styles.modalSubmit} onPress={handleSubmit}>
                      <Text style={styles.modalSubmitText}>Parrainer un ami</Text>
                    </TouchableOpacity>
                  </ScrollView>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
    marginTop: 0,
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#222',
  },
  ctaButton: {
    backgroundColor: '#FF8C42',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#E8EAF0',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 16,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  resultsText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 16,
  },
  cardContainer: {
    marginBottom: 16,
  },
  tipserCard: {
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
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
  },
  statusBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  statusIcon: {
    fontSize: 8,
  },
  basicInfo: {
    flex: 1,
  },
  tipserName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 2,
  },
  profession: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '600',
    marginBottom: 2,
  },
  location: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 2,
  },
  experience: {
    fontSize: 13,
    color: '#6B7280',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
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
  contactSection: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A237E',
    borderRadius: 10,
    paddingVertical: 12,
    gap: 8,
  },
  contactIcon: {
    fontSize: 16,
  },
  contactText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  messageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  messageIcon: {
    fontSize: 16,
  },
  messageText: {
    color: '#1A237E',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
    lineHeight: 20,
  },
  afterworkCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F1F3',
    marginBottom: 16,
  },
  imageContainer: {
    position: 'relative',
    height: 160,
  },
  afterworkImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  categoryBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  almostFullBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#F59E0B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  almostFullText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  afterworkContent: {
    padding: 16,
  },
  afterworkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 8,
  },
  afterworkDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  afterworkDetails: {
    marginBottom: 12,
  },
  afterworkDate: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
    fontWeight: '500',
  },
  afterworkLocation: {
    fontSize: 14,
    color: '#6B7280',
  },
  afterworkBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  afterworkPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
  },
  afterworkAttendees: {
    fontSize: 12,
    color: '#6B7280',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '92%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 8,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A237E',
  },
  modalClose: {
    fontSize: 28,
    color: '#1A237E',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalDescription: {
    backgroundColor: '#F0F9FF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  modalDescriptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 8,
  },
  modalDescriptionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  modalLabel: {
    fontSize: 15,
    color: '#222',
    marginTop: 8,
    marginBottom: 2,
    fontWeight: '500',
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#222',
  },
  modalSubmit: {
    backgroundColor: '#FF8C42',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  modalSubmitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputError: {
    borderColor: '#E53935',
  },
});