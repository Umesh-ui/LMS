import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {wordCount, getData, storeData} from '../utils/storage';

const DetailScreen = ({route, navigation}) => {
  const {course} = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadFavorites = async () => {
      const favorites = await getData('favorites');
      if (favorites && favorites.includes(course.id)) {
        setIsFavorite(true);
      }
    };
    loadFavorites();
  }, [course.id]);

  const toggleFavorite = async () => {
    const favorites = (await getData('favorites')) || [];
    let updatedFavorites;

    if (favorites.includes(course.id)) {
      updatedFavorites = favorites.filter(id => id !== course.id);
      setIsFavorite(false);
    } else {
      updatedFavorites = [...favorites, course.id];
      setIsFavorite(true);
    }

    await storeData('favorites', updatedFavorites);
  };

  return (
    <SafeAreaView style={styles.safeView}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{course.title}</Text>
        <Text style={styles.subInfo}>Instructor ID: {course.userId}</Text>
        <Text style={styles.body}>{course.body}</Text>
        <Text style={styles.meta}>
          Title Word Count: {wordCount(course.title)}
        </Text>
        <Text style={styles.favoriteLabel}>
          Favorite Status: {isFavorite ? '⭐ Yes' : 'No'}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            isFavorite ? styles.unfavoriteBtn : styles.favoriteBtn,
          ]}
          onPress={toggleFavorite}>
          <Text style={styles.buttonText}>
            {isFavorite ? 'Remove from Favorites' : 'Mark as Favorite'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  subInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
    marginBottom: 16,
  },
  meta: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  favoriteLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  favoriteBtn: {
    backgroundColor: '#6a0dad',
  },
  unfavoriteBtn: {
    backgroundColor: '#c0392b',
  },
  backBtn: {
    backgroundColor: '#888',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default DetailScreen;
