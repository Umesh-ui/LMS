import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {View, Text, Switch, TouchableOpacity, StyleSheet} from 'react-native';

const FilterController = ({
  userIds,
  selectedUserId,
  setSelectedUserId,
  longTitlesOnly,
  setLongTitlesOnly,
  sortAsc,
  setSortAsc,
}) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedUserId}
        style={styles.picker}
        onValueChange={setSelectedUserId}>
        <Picker.Item label="All Instructors" value={null} />
        {userIds.map(id => (
          <Picker.Item key={id} label={`Instructor ${id}`} value={id} />
        ))}
      </Picker>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Long Titles</Text>
        <Switch value={longTitlesOnly} onValueChange={setLongTitlesOnly} />
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => setSortAsc(!sortAsc)}>
        <Text style={styles.buttonText}>Sort: {sortAsc ? 'Asc' : 'Desc'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
    gap: 10,
  },
  picker: {
    flex: 1,
    height: 60,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  label: {
    marginRight: 5,
  },
  button: {
    backgroundColor: 'purple',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default FilterController;
