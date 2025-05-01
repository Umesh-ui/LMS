import React, {useState, useEffect, useCallback, useLayoutEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CourseItem from '../components/CourseItem';
import FilterController from '../components/FilterController';
import {storeData, getData, wordCount} from '../utils/storage';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [longTitlesOnly, setLongTitlesOnly] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <TextInput
          placeholder="Search courses"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      ),
    });
  }, [navigation, searchQuery]);

  const fetchCourses = useCallback(async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts',
      );
      const data = await response.json();
      await storeData('courses', data);
      setCourses(data);
      setUserIds([...new Set(data.map(course => course.userId))]);
    } catch (err) {
      const cached = await getData('courses');
      if (cached) setCourses(cached);
      else setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    const applyFilters = () => {
      let result = [...courses];

      if (selectedUserId) {
        result = result.filter(c => c.userId === selectedUserId);
      }

      if (longTitlesOnly) {
        result = result.filter(c => wordCount(c.title) >= 5);
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        result = result.filter(c => c.title.toLowerCase().includes(q));
      }

      result.sort((a, b) => {
        const wcA = wordCount(a.title);
        const wcB = wordCount(b.title);
        return sortAsc ? wcA - wcB : wcB - wcA;
      });

      setFilteredCourses(result);
    };

    applyFilters();
  }, [courses, selectedUserId, longTitlesOnly, sortAsc, searchQuery]);

  const toggleFavorite = async id => {
    const updated = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    await storeData('favorites', updated);
  };

  const handleCoursePress = course => {
    navigation.navigate('Detail', {course});
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error loading courses</Text>
        <Button title="Retry" onPress={fetchCourses} color="#FF3B30" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Available Courses</Text>

      <FlatList
        data={filteredCourses}
        renderItem={({item}) => (
          <CourseItem
            course={item}
            onPress={handleCoursePress}
            isFavorite={favorites.includes(item.id)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <FilterController
            userIds={userIds}
            selectedUserId={selectedUserId}
            setSelectedUserId={setSelectedUserId}
            longTitlesOnly={longTitlesOnly}
            setLongTitlesOnly={setLongTitlesOnly}
            sortAsc={sortAsc}
            setSortAsc={setSortAsc}
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>No courses match the filters.</Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
    // paddingTop: 100,
  },
  listContent: {
    paddingBottom: 16,
  },
  separator: {
    height: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
});

export default HomeScreen;
