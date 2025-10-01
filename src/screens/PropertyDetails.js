import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export default function PropertyDetails({ navigation, route }) {
  const { property } = route.params;
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

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

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
    console.log('Soumission:', form);
    closeModal();
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header with back arrow */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Détails du bien</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {/* Property Image */}
        <Image
          source={{ uri: property.image }}
          style={styles.propertyImage}
          resizeMode="cover"
        />

        {/* Property Info */}
        <View style={styles.propertyInfo}>
          <Text style={styles.propertyTitle}>{property.title}</Text>
          <Text style={styles.propertyLocation}>{property.location.city} - {property.location.district}</Text>
          
          <View style={styles.propertyDetails}>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>📐</Text>
              <Text style={styles.detailText}>{property.area}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>🛏️</Text>
              <Text style={styles.detailText}>{property.rooms.bedrooms}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.detailIcon}>🛁</Text>
              <Text style={styles.detailText}>{property.rooms.bathrooms}</Text>
            </View>
          </View>
          
          <Text style={styles.propertyPrice}>{property.price}</Text>

          {/* Description Section */}
          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.descriptionText}>
              {property.description || "Magnifique propriété située dans un quartier calme et recherché. Cette maison offre un cadre de vie exceptionnel avec des finitions de qualité et une architecture moderne. Idéale pour une famille cherchant le confort et la tranquillité."}
            </Text>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Caractéristiques</Text>
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🏠</Text>
                <Text style={styles.featureText}>Type: {property.type || 'Maison'}</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📐</Text>
                <Text style={styles.featureText}>Surface: {property.area}</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🛏️</Text>
                <Text style={styles.featureText}>Chambres: {property.rooms.bedrooms}</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🛁</Text>
                <Text style={styles.featureText}>Salles de bain: {property.rooms.bathrooms}</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>📍</Text>
                <Text style={styles.featureText}>Quartier: {property.location.district}</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🏙️</Text>
                <Text style={styles.featureText}>Ville: {property.location.city}</Text>
              </View>
            </View>
          </View>

          {/* CTA Button */}
          <TouchableOpacity style={styles.ctaButton} onPress={openModal}>
            <Text style={styles.ctaButtonText}>Recommander un acheteur</Text>
          </TouchableOpacity>
        </View>
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
  scrollContainer: {
    flex: 1,
  },
  propertyImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#E5E7EB',
  },
  propertyInfo: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  propertyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 8,
  },
  propertyLocation: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  propertyDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailIcon: {
    fontSize: 18,
  },
  detailText: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '500',
  },
  propertyPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 24,
  },
  descriptionSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
  },
  featuresSection: {
    marginBottom: 32,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureIcon: {
    fontSize: 16,
    width: 24,
  },
  featureText: {
    fontSize: 16,
    color: '#4B5563',
    flex: 1,
  },
  ctaButton: {
    backgroundColor: '#1A237E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  ctaButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
