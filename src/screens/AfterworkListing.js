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
const afterworks = require('../assets/afterworks.json');

export default function AfterworkListing({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [animatedValues] = useState(
    afterworks.map(() => new Animated.Value(0))
  );

  const categories = ['Tous', 'Networking', 'Innovation', 'Investissement', 'Jeunes Pro', 'Luxury', 'Marketing'];

  const handleGoBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const filteredAfterworks = afterworks.filter(afterwork => {
    const matchesSearch = 
      afterwork.title.toLowerCase().includes(search.toLowerCase()) ||
      afterwork.location.city.toLowerCase().includes(search.toLowerCase()) ||
      afterwork.location.venue.toLowerCase().includes(search.toLowerCase()) ||
      afterwork.category.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Tous' || afterwork.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('fr-FR', options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Networking': '#3B82F6',
      'Innovation': '#8B5CF6',
      'Investissement': '#059669',
      'Jeunes Pro': '#F59E0B',
      'Luxury': '#DC2626',
      'Marketing': '#EC4899'
    };
    return colors[category] || '#6B7280';
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
    
    // Navigate to details (you can implement this later)
    console.log('Navigate to afterwork details:', item.title);
  };

  const renderAfterworkCard = ({ item, index }) => {
    const scale = animatedValues[index].interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0.95],
    });

    const attendancePercentage = (item.attendees / item.maxAttendees) * 100;
    const isAlmostFull = attendancePercentage > 80;

    return (
      <Animated.View style={[styles.cardContainer, { transform: [{ scale }] }]}>
        <TouchableOpacity
          style={styles.afterworkCard}
          onPress={() => handleCardPress(item, index)}
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
            <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor(item.category) }]}>
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
          <View style={styles.cardContent}>
            <Text style={styles.afterworkTitle}>{item.title}</Text>
            <Text style={styles.afterworkDescription} numberOfLines={2}>
              {item.description}
            </Text>

            {/* Date and time */}
            <View style={styles.dateTimeContainer}>
              <View style={styles.dateTimeItem}>
                <Text style={styles.dateTimeIcon}>📅</Text>
                <Text style={styles.dateTimeText}>{formatDate(item.date)}</Text>
              </View>
              <View style={styles.dateTimeItem}>
                <Text style={styles.dateTimeIcon}>🕐</Text>
                <Text style={styles.dateTimeText}>{item.time}</Text>
              </View>
            </View>

            {/* Location */}
            <View style={styles.locationContainer}>
              <Text style={styles.locationIcon}>📍</Text>
              <View style={styles.locationInfo}>
                <Text style={styles.venueName}>{item.location.venue}</Text>
                <Text style={styles.locationAddress}>
                  {item.location.district}, {item.location.city}
                </Text>
              </View>
            </View>

            {/* Highlights */}
            <View style={styles.highlightsContainer}>
              {item.highlights.slice(0, 2).map((highlight, idx) => (
                <View key={idx} style={styles.highlightBadge}>
                  <Text style={styles.highlightText}>✨ {highlight}</Text>
                </View>
              ))}
            </View>

            {/* Bottom info */}
            <View style={styles.bottomInfo}>
              <View style={styles.attendeesInfo}>
                <Text style={styles.attendeesIcon}>👥</Text>
                <Text style={styles.attendeesText}>
                  {item.attendees}/{item.maxAttendees} participants
                </Text>
              </View>
              <View style={styles.priceContainer}>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>

            {/* Progress bar */}
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { 
                      width: `${attendancePercentage}%`,
                      backgroundColor: isAlmostFull ? '#F59E0B' : '#3B82F6'
                    }
                  ]} 
                />
              </View>
            </View>

            {/* Action button */}
            <TouchableOpacity style={styles.joinButton}>
              <Text style={styles.joinButtonText}>S'inscrire</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderCategoryFilter = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesContainer}
      contentContainerStyle={styles.categoriesContent}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryFilter,
            selectedCategory === category && styles.categoryFilterActive
          ]}
          onPress={() => setSelectedCategory(category)}
        >
          <Text style={[
            styles.categoryFilterText,
            selectedCategory === category && styles.categoryFilterTextActive
          ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Afterwork by Yakeey</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un afterwork..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Category filters */}
      {renderCategoryFilter()}

      {/* Results count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredAfterworks.length} afterwork{filteredAfterworks.length > 1 ? 's' : ''} trouvé{filteredAfterworks.length > 1 ? 's' : ''}
        </Text>
      </View>

      {/* Afterworks list */}
      <FlatList
        data={filteredAfterworks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAfterworkCard}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🎉</Text>
            <Text style={styles.emptyTitle}>Aucun afterwork trouvé</Text>
            <Text style={styles.emptyText}>
              {search || selectedCategory !== 'Tous' 
                ? 'Essayez de modifier vos critères de recherche.' 
                : 'Aucun afterwork disponible pour le moment.'}
            </Text>
          </View>
        }
      />
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
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    backgroundColor: '#F4F6FA',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    color: '#222',
  },
  categoriesContainer: {
    backgroundColor: '#fff',
    paddingVertical: 7.5,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  categoriesContent: {
    paddingHorizontal: 10,
    gap: 10,
  },
  categoryFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryFilterActive: {
    backgroundColor: '#1A237E',
    borderColor: '#1A237E',
  },
  categoryFilterText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    textAlign: 'left',
  },
  categoryFilterTextActive: {
    color: '#fff',
  },
  resultsContainer: {
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
    marginBottom: 20,
  },
  afterworkCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: '#F0F1F3',
  },
  imageContainer: {
    position: 'relative',
    height: 200,
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
  cardContent: {
    padding: 20,
  },
  afterworkTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 8,
  },
  afterworkDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 16,
  },
  dateTimeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  dateTimeIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#4B5563',
    fontWeight: '500',
    flex: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  locationIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  locationInfo: {
    flex: 1,
  },
  venueName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1A237E',
    marginBottom: 2,
  },
  locationAddress: {
    fontSize: 13,
    color: '#6B7280',
  },
  highlightsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
    gap: 8,
  },
  highlightBadge: {
    backgroundColor: '#F0F9FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  highlightText: {
    fontSize: 12,
    color: '#0369A1',
    fontWeight: '500',
  },
  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  attendeesInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attendeesIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  attendeesText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  priceContainer: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBF7D0',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  joinButton: {
    backgroundColor: '#1A237E',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
