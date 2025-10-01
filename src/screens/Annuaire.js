import React, { useState } from 'react';
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
  Animated,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const professionals = require('../assets/professionals.json');

export default function Annuaire({ navigation }) {
  const [locationSearch, setLocationSearch] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('tous');
  const [animatedValues] = useState(
    professionals.map(() => new Animated.Value(0))
  );

  const categories = [
    { key: 'tous', label: 'Tous', icon: '👥' },
    { key: 'Agent immobilier', label: 'Agents', icon: '🏠' },
    { key: 'Architecte', label: 'Architectes', icon: '📐' },
    { key: 'Notaire', label: 'Notaires', icon: '📋' },
    { key: 'Avocat immobilier', label: 'Avocats', icon: '⚖️' },
    { key: 'Décoratrice d\'intérieur', label: 'Décorateurs', icon: '🎨' },
  ];

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const filteredProfessionals = professionals.filter(professional => {
    const matchesLocation = professional.location.toLowerCase().includes(locationSearch.toLowerCase());
    const matchesService = 
      professional.profession.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      professional.specialties.some(specialty => 
        specialty.toLowerCase().includes(serviceSearch.toLowerCase())
      ) ||
      professional.name.toLowerCase().includes(serviceSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'tous' || professional.profession === selectedCategory;
    
    return matchesLocation && matchesService && matchesCategory;
  });

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

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Text key={i} style={styles.star}>⭐</Text>);
    }
    if (hasHalfStar) {
      stars.push(<Text key="half" style={styles.star}>⭐</Text>);
    }
    return stars;
  };

  const renderProfessionalCard = ({ item, index }) => {
    const scale = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.95],
    });

    return (
      <Animated.View style={[styles.cardContainer, { transform: [{ scale }] }]}>
        <TouchableOpacity
          style={styles.professionalCard}
          onPress={() => handleCardPress(item, index)}
          activeOpacity={0.9}
        >
          {/* Header with avatar and basic info */}
          <View style={styles.cardHeader}>
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: item.avatar }}
                style={styles.avatar}
                resizeMode="cover"
              />
              {item.verified && (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedIcon}>✓</Text>
                </View>
              )}
            </View>
            
            <View style={styles.basicInfo}>
              <Text style={styles.professionalName}>{item.name}</Text>
              <Text style={styles.profession}>{item.profession}</Text>
              <Text style={styles.company}>{item.company}</Text>
              <Text style={styles.location}>📍 {item.location}</Text>
            </View>
          </View>

          {/* Rating and experience */}
          <View style={styles.ratingSection}>
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderStars(item.rating)}
              </View>
              <Text style={styles.ratingText}>{item.rating}</Text>
              <Text style={styles.reviewsText}>({item.reviewsCount} avis)</Text>
            </View>
            <View style={styles.experienceContainer}>
              <Text style={styles.experienceText}>{item.experience} d'expérience</Text>
            </View>
          </View>

          {/* Specialties */}
          <View style={styles.specialtiesSection}>
            <Text style={styles.specialtiesLabel}>Spécialités:</Text>
            <View style={styles.specialtiesContainer}>
              {item.specialties.slice(0, 3).map((specialty, idx) => (
                <View key={idx} style={styles.specialtyBadge}>
                  <Text style={styles.specialtyText}>{specialty}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Languages */}
          <View style={styles.languagesSection}>
            <Text style={styles.languagesLabel}>Langues: </Text>
            <Text style={styles.languagesText}>{item.languages.join(', ')}</Text>
          </View>

          {/* Description */}
          <Text style={styles.description} numberOfLines={2}>
            {item.description}
          </Text>

          {/* Contact buttons */}
          <View style={styles.contactSection}>
            <TouchableOpacity style={styles.phoneButton}>
              <Text style={styles.phoneIcon}>📞</Text>
              <Text style={styles.phoneText}>Appeler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.emailButton}>
              <Text style={styles.emailIcon}>✉️</Text>
              <Text style={styles.emailText}>Email</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category.key}
      style={[
        styles.categoryButton,
        selectedCategory === category.key && styles.categoryButtonActive
      ]}
      onPress={() => setSelectedCategory(category.key)}
    >
      <Text style={styles.categoryIcon}>{category.icon}</Text>
      <Text style={[
        styles.categoryText,
        selectedCategory === category.key && styles.categoryTextActive
      ]}>
        {category.label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Annuaire professionnel</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <View style={styles.heroIcon}>
              <Text style={styles.heroIconText}>👥</Text>
            </View>
            <Text style={styles.heroTitle}>Annuaire professionnel</Text>
            <Text style={styles.heroSubtitle}>
              Trouvez les professionnels de l'immobilier près de chez vous. 
              Gratuit et sans commission.
            </Text>
          </View>
        </View>

        {/* Search Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>📍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="Où se situe votre besoin ?"
                placeholderTextColor="#888"
                value={locationSearch}
                onChangeText={setLocationSearch}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder="De quoi avez-vous besoin ?"
                placeholderTextColor="#888"
                value={serviceSearch}
                onChangeText={setServiceSearch}
              />
            </View>
            
            <TouchableOpacity style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Chercher un professionnel</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}
          >
            {categories.map(renderCategoryButton)}
          </ScrollView>
        </View>

        {/* Results */}
        <View style={styles.resultsSection}>
          <Text style={styles.resultsText}>
            {filteredProfessionals.length} professionnel{filteredProfessionals.length > 1 ? 's' : ''} trouvé{filteredProfessionals.length > 1 ? 's' : ''}
          </Text>
        </View>

        {/* Professionals List */}
        <View style={styles.listContent}>
          {filteredProfessionals.length > 0 ? (
            filteredProfessionals.map((item, index) => (
              <View key={item.id}>
                {renderProfessionalCard({ item, index })}
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyTitle}>Aucun professionnel trouvé</Text>
              <Text style={styles.emptyText}>
                Essayez de modifier vos critères de recherche ou votre localisation.
              </Text>
            </View>
          )}
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
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    backgroundColor: '#1A237E',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroIconText: {
    fontSize: 24,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 24,
  },
  searchSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: -20,
    marginHorizontal: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
  },
  searchContainer: {
    gap: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F6FA',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#222',
    paddingVertical: 12,
  },
  searchButton: {
    backgroundColor: '#FF8C42',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoriesSection: {
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  categoryButton: {
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
  categoryButtonActive: {
    backgroundColor: '#1A237E',
    borderColor: '#1A237E',
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '600',
  },
  categoryTextActive: {
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
  professionalCard: {
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
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  verifiedIcon: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  basicInfo: {
    flex: 1,
  },
  professionalName: {
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
  company: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
    color: '#9CA3AF',
  },
  ratingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    fontSize: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  experienceContainer: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  experienceText: {
    fontSize: 12,
    color: '#0369A1',
    fontWeight: '600',
  },
  specialtiesSection: {
    marginBottom: 12,
  },
  specialtiesLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
    marginBottom: 8,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  specialtyBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  specialtyText: {
    fontSize: 12,
    color: '#1A237E',
    fontWeight: '500',
  },
  languagesSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  languagesLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  languagesText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactSection: {
    flexDirection: 'row',
    gap: 12,
  },
  phoneButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1A237E',
    borderRadius: 10,
    paddingVertical: 12,
    gap: 8,
  },
  phoneIcon: {
    fontSize: 16,
  },
  phoneText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emailButton: {
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
  emailIcon: {
    fontSize: 16,
  },
  emailText: {
    color: '#1A237E',
    fontSize: 14,
    fontWeight: '600',
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
