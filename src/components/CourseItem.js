import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {wordCount} from '../utils/storage';

const CourseItem = ({course, onPress, isFavorite}) => {
  return (
    <TouchableOpacity onPress={() => onPress(course)} style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {course.title}{' '}
          <Text style={styles.badge}> {wordCount(course.title)} </Text>{' '}
        </Text>
        {isFavorite && <Text style={styles.favorite}>⭐</Text>}
      </View>
      <Text style={styles.meta}>Instructor ID: {course.userId}</Text>
      {/* <Text style={styles.meta}>Word Count: {wordCount(course.title)}</Text> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    elevation: 3,
    margin: 5,
  },
  badge: {
    fontWeight: 'normal',
    fontSize: 14,
    borderWidth: 1,
    height: 20,
    width: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    color: '#333',
  },
  favorite: {
    fontSize: 18,
    marginLeft: 8,
  },
  meta: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default CourseItem;
