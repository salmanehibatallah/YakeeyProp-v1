import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const { width } = Dimensions.get('window');

// TODO: replace mock with real data
const tiles = [
  { key: '1', label: 'Biens à la vente' },
  { key: '2', label: 'Annuaire professionnel' },
  { key: '3', label: 'Afterwork by Yakeey' },
  { key: '4', label: 'Ma Cagnotte' },
];

// TODO: replace mock with real data
const biens = require('../assets/biens.json');

const TUILE_SIZE = (width - 56) / 2; // 16px padding + 12px gap
const ACTIVE_COLOR = '#1A237E';
const INACTIVE_COLOR = '#7A7F87';

export default function Accueil({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({
    type: '',
    nom: '',
    telephone: '',
    email: '',
    ville: '',
    description: '',
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const scrollRef = useRef();
  const besoinOptions = [
    { label: 'Acheter', value: 'acheter' },
    { label: 'Vendre', value: 'vendre' },
    { label: 'Louer', value: 'louer' },
    { label: 'Mettre en location', value: 'mettre_en_location' },
  ];

  const openModal = () => {
    setModalVisible(true);
    setTouched({});
    setErrors({});
  };
  const closeModal = () => {
    setModalVisible(false);
    setDropdownOpen(false);
    setForm({ type: '', nom: '', telephone: '', email: '', ville: '', description: '' });
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
    if (!form.type) newErrors.type = true;
    if (!form.nom) newErrors.nom = true;
    if (!form.telephone) newErrors.telephone = true;
    if (!form.email) newErrors.email = true;
    if (!form.ville) newErrors.ville = true;
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    setTouched({ type: true, nom: true, telephone: true, email: true, ville: true });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      // Scroll to first error
      if (scrollRef.current) {
        const keys = ['type', 'nom', 'telephone', 'email', 'ville'];
        const firstError = keys.find(k => newErrors[k]);
        if (firstError) {
          const y = {
            type: 0,
            nom: 60,
            telephone: 120,
            email: 180,
            ville: 240,
          }[firstError];
          scrollRef.current.scrollTo({ y, animated: true });
        }
      }
      return;
    }
    // TODO: handle form submission
    console.log('Soumission:', form);
    closeModal();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.header}>Bonjour Hibatallah</Text>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Ma cagnotte</Text>
          <Text style={styles.balanceAmount}>12 500 MAD</Text>
          <Text style={styles.balancePotential}>Potentiel : 3 000 MAD</Text>
        </View>

        {/* CTA */}
        <Pressable
          style={styles.cta}
          onPress={openModal}
        >
          <Text style={styles.ctaText}>+ Faire une recommandation</Text>
        </Pressable>

        {/* Grid Tiles */}
        <View style={styles.grid}>
          <Pressable
            style={({ pressed }) => [styles.tileCard, pressed && styles.tileCardPressed]}
            onPress={() => navigation && navigation.navigate && navigation.navigate('ListingBiens')}
          >
            {/* Home icon */}
            <View style={styles.tileIconWrap}>
              <View style={styles.tileHomeRoof} />
              <View style={styles.tileHomeBase} />
            </View>
            <Text style={styles.tileLabel}>Biens à la vente</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.tileCard, pressed && styles.tileCardPressed]}
            onPress={() => navigation && navigation.navigate && navigation.navigate('Annuaire')}
          >
            {/* Directory icon */}
            <View style={styles.tileIconWrap}>
              <View style={styles.tileBookCover} />
              <View style={styles.tileBookLine1} />
              <View style={styles.tileBookLine2} />
            </View>
            <Text style={styles.tileLabel}>Annuaire professionnel</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.tileCard, pressed && styles.tileCardPressed]}
            onPress={() => navigation && navigation.navigate && navigation.navigate('AfterworkListing')}
          >
            {/* Afterwork icon (glass) */}
            <View style={styles.tileIconWrap}>
              <View style={styles.tileGlassBowl} />
              <View style={styles.tileGlassStem} />
              <View style={styles.tileGlassBase} />
            </View>
            <Text style={styles.tileLabel}>Afterwork by Yakeey</Text>
          </Pressable>
          <Pressable
            style={({ pressed }) => [styles.tileCard, pressed && styles.tileCardPressed]}
            onPress={() => navigation && navigation.navigate && navigation.navigate('Cagnotte')}
          >
            {/* Wallet icon */}
            <View style={styles.tileIconWrap}>
              <View style={styles.tileWalletBody} />
              <View style={styles.tileWalletFlap} />
              <View style={styles.tileWalletDot} />
            </View>
            <Text style={styles.tileLabel}>Ma Cagnotte</Text>
          </Pressable>
        </View>

        {/* Biens recommandés */}
        <Text style={styles.sectionTitle}>Biens recommandés</Text>
        <FlatList
          data={biens}
          keyExtractor={item => item.title}
          renderItem={({ item }) => (
            <Pressable
              style={({ pressed }) => [
                styles.bienCard,
                pressed && styles.bienCardPressed,
              ]}
              onPress={openModal}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.bienImage}
                resizeMode="cover"
              />
              <View style={styles.bienInfo}>
                <Text style={styles.bienTitle}>{item.title}</Text>
                <Text style={styles.bienSubtitle}>{item.location.city} - {item.location.district}</Text>
                <View style={styles.bienDetailsRow}>
                  <View style={styles.bienDetailIconRow}>
                    <View style={styles.iconArea}><Text style={styles.iconAreaText}>▭</Text></View>
                    <Text style={styles.bienDetail}>{item.area}</Text>
                  </View>
                  <View style={styles.bienDetailIconRow}>
                    <View style={styles.iconBed}><Text style={styles.iconBedText}>🛏️</Text></View>
                    <Text style={styles.bienDetail}>{item.rooms.bedrooms}</Text>
                  </View>
                  <View style={styles.bienDetailIconRow}>
                    <View style={styles.iconBath}><Text style={styles.iconBathText}>🛁</Text></View>
                    <Text style={styles.bienDetail}>{item.rooms.bathrooms}</Text>
                  </View>
                </View>
                <Text style={styles.bienPrice}>{item.price}</Text>
                <Pressable
                  style={styles.bienCta}
                  onPress={openModal}
                >
                  <Text style={styles.bienCtaText}>Recommander un acheteur</Text>
                </Pressable>
              </View>
            </Pressable>
          )}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 16 }}
        />
        {/* Padding for footer */}
        <View style={{ height: 80 }} />
      </ScrollView>


      {/* Modal for recommendation */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={() => { setDropdownOpen(false); Keyboard.dismiss(); }}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              style={{ width: '100%', alignItems: 'center' }}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContent}>
                  <ScrollView ref={scrollRef} keyboardShouldPersistTaps="handled">
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Faire une recommandation</Text>
                      <TouchableOpacity onPress={closeModal} hitSlop={{top:10,left:10,bottom:10,right:10}}>
                        <Text style={styles.modalClose}>×</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.modalLabel}>Type de besoin</Text>
                    <TouchableOpacity
                      style={[styles.dropdown, errors.type && touched.type && styles.inputError]}
                      onPress={() => setDropdownOpen(!dropdownOpen)}
                      activeOpacity={0.8}
                    >
                      <Text style={{ color: form.type ? '#222' : '#888', fontSize: 15 }}>
                        {form.type ? besoinOptions.find(opt => opt.value === form.type)?.label : 'Sélectionnez'}
                      </Text>
                      <Text style={{ fontSize: 16, color: '#1A237E' }}>{dropdownOpen ? '▲' : '▼'}</Text>
                    </TouchableOpacity>
                    {dropdownOpen && (
                      <View style={styles.dropdownList}>
                        {besoinOptions.map(opt => (
                          <TouchableOpacity
                            key={opt.value}
                            style={styles.dropdownItem}
                            onPress={() => {
                              handleFormChange('type', opt.value);
                              setDropdownOpen(false);
                            }}
                          >
                            <Text style={{ color: '#222', fontSize: 15 }}>{opt.label}</Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    <Text style={styles.modalLabel}>Nom du contact</Text>
                    <TextInput
                      style={[styles.modalInput, errors.nom && touched.nom && styles.inputError]}
                      placeholder="Nom complet"
                      placeholderTextColor="#888"
                      value={form.nom}
                      onChangeText={v => handleFormChange('nom', v)}
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
                      placeholder="Ville"
                      placeholderTextColor="#888"
                      value={form.ville}
                      onChangeText={v => handleFormChange('ville', v)}
                      returnKeyType="next"
                    />
                    <Text style={styles.modalLabel}>Description libre</Text>
                    <TextInput
                      style={[styles.modalInput, { height: 70, textAlignVertical: 'top' }]}
                      placeholder="Détails supplémentaires..."
                      placeholderTextColor="#888"
                      multiline
                      value={form.description}
                      onChangeText={v => handleFormChange('description', v)}
                    />
                    <TouchableOpacity style={styles.modalSubmit} onPress={handleSubmit}>
                      <Text style={styles.modalSubmitText}>Soumettre</Text>
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
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 18,
    color: '#1A237E',
  },
  balanceCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 18,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#888',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 2,
  },
  balancePotential: {
    fontSize: 14,
    color: '#666',
  },
  cta: {
    backgroundColor: '#1A237E',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 18,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: -90,
    gap: 12,
  },
  tileCard: {
    width: '48%',
    aspectRatio: 1.1,
    backgroundColor: '#fff',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#F0F1F3',
    padding: 10,
    transitionDuration: '150ms',
  },
  tileCardPressed: {
    opacity: 0.7,
    backgroundColor: '#F4F6FA',
  },
  tileIconWrap: {
    width: 38,
    height: 38,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Home icon for Biens à la vente
  tileHomeRoof: {
    width: 24,
    height: 4,
    backgroundColor: '#1A237E',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    position: 'absolute',
    top: 8,
    left: 7,
    transform: [{ rotate: '-10deg' }],
  },
  tileHomeBase: {
    width: 18,
    height: 12,
    backgroundColor: '#1A237E',
    borderRadius: 3,
    position: 'absolute',
    top: 16,
    left: 10,
  },
  // Directory icon for Annuaire professionnel
  tileBookCover: {
    width: 22,
    height: 28,
    borderWidth: 2,
    borderColor: '#1A237E',
    borderRadius: 4,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 4,
    left: 8,
  },
  tileBookLine1: {
    width: 12,
    height: 2,
    backgroundColor: '#1A237E',
    position: 'absolute',
    top: 10,
    left: 13,
    borderRadius: 1,
  },
  tileBookLine2: {
    width: 12,
    height: 2,
    backgroundColor: '#1A237E',
    position: 'absolute',
    top: 18,
    left: 13,
    borderRadius: 1,
  },
  // Afterwork icon (glass)
  tileGlassBowl: {
    width: 20,
    height: 14,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 2,
    borderColor: '#1A237E',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 10,
    left: 9,
  },
  tileGlassStem: {
    width: 4,
    height: 10,
    backgroundColor: '#1A237E',
    position: 'absolute',
    top: 22,
    left: 17,
    borderRadius: 2,
  },
  tileGlassBase: {
    width: 12,
    height: 3,
    backgroundColor: '#1A237E',
    position: 'absolute',
    top: 32,
    left: 13,
    borderRadius: 2,
  },
  // Wallet icon for Ma Cagnotte
  tileWalletBody: {
    width: 24,
    height: 16,
    backgroundColor: '#1A237E',
    borderRadius: 4,
    position: 'absolute',
    top: 12,
    left: 7,
  },
  tileWalletFlap: {
    width: 18,
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 2,
    position: 'absolute',
    top: 12,
    left: 10,
    borderWidth: 1,
    borderColor: '#1A237E',
  },
  tileWalletDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    position: 'absolute',
    top: 20,
    left: 23,
    borderWidth: 1,
    borderColor: '#1A237E',
  },
  tileLabel: {
    fontSize: 14,
    color: '#1A237E',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 8,
  },
  tile: {
    width: TUILE_SIZE,
    height: TUILE_SIZE,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
  },
  tileIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  tileLabel: {
    fontSize: 14,
    color: '#1A237E',
    textAlign: 'center',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 10,
    marginTop: 8,
  },
  bienCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: '#F0F1F3',
    transitionDuration: '150ms',
  },
  bienCardPressed: {
    opacity: 0.7,
    backgroundColor: '#F4F6FA',
  },
  bienImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: '#eee',
  },
  bienInfo: {
    flex: 1,
  },
  bienTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 2,
  },
  bienSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  bienDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 12,
  },
  bienDetailIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    gap: 2,
  },
  bienDetail: {
    fontSize: 13,
    color: '#888',
    marginLeft: 2,
  },
  bienPrice: {
    fontSize: 15,
    color: '#388E3C',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bienCta: {
    backgroundColor: '#E3E6F5',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 2,
  },
  bienCtaText: {
    color: '#1A237E',
    fontWeight: 'bold',
    fontSize: 14,
  },
  iconArea: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  iconAreaText: {
    fontSize: 13,
    color: '#1A237E',
  },
  iconBed: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  iconBedText: {
    fontSize: 13,
    color: '#1A237E',
  },
  iconBath: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 2,
  },
  iconBathText: {
    fontSize: 13,
    color: '#1A237E',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
    backgroundColor: '#F8F9FA',
    flexDirection: 'row',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: -4 },
    shadowRadius: 16,
    elevation: 16,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: 18,
    paddingTop: 10,
    overflow: 'hidden',
  },
  footerTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  footerLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 2,
  },
  // Home icon
  iconHomeOutline: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconHomeRoofLine: {
    position: 'absolute',
    top: 7,
    left: 6,
    width: 20,
    height: 0,
    borderTopWidth: 2.5,
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderColor: ACTIVE_COLOR,
    borderRadius: 2,
    transform: [{ rotate: '-8deg' }],
  },
  iconHomeBaseOutline: {
    position: 'absolute',
    top: 14,
    left: 10,
    width: 12,
    height: 10,
    borderWidth: 2.5,
    borderColor: ACTIVE_COLOR,
    borderRadius: 2,
    backgroundColor: 'transparent',
  },
  // Document icon
  iconDocOutline: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconDocRect: {
    position: 'absolute',
    top: 7,
    left: 8,
    width: 16,
    height: 18,
    borderWidth: 2,
    borderRadius: 3,
    backgroundColor: 'transparent',
  },
  iconDocLine: {
    position: 'absolute',
    left: 11,
    top: 12,
    width: 10,
    height: 2,
    borderRadius: 1,
    backgroundColor: INACTIVE_COLOR,
  },
  // Network icon
  iconNetworkOutline: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconNetworkHead: {
    position: 'absolute',
    top: 8,
    left: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  iconNetworkBody: {
    position: 'absolute',
    top: 16,
    left: 2,
    width: 16,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  // Bell icon
  iconBellOutline: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBellBodyOutline: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 16,
    height: 14,
    borderWidth: 2,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    backgroundColor: 'transparent',
  },
  iconBellClapperOutline: {
    position: 'absolute',
    top: 22,
    left: 14,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: INACTIVE_COLOR,
  },
  // Profile icon
  iconProfileOutline: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconProfileHeadOutline: {
    position: 'absolute',
    top: 8,
    left: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
    backgroundColor: 'transparent',
  },
  iconProfileBodyOutline: {
    position: 'absolute',
    top: 16,
    left: 8,
    width: 16,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: 'transparent',
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
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
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
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F4F6FA',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 4,
  },
  dropdownList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 4,
    marginTop: -4,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalSubmit: {
    backgroundColor: '#1A237E',
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
