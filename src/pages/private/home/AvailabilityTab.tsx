import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Calendar as CalendarIcon } from 'lucide-react-native';
import { postAPI } from '../../../apis/api';

export const AvailabilityTab = () => {
  const [loading, setLoading] = useState(false);
  const [repeatSessions, setRepeatSessions] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ [date: string]: any }>({});
  
  const handleDayPress = (day: any) => {
    const currentSelected = { ...selectedDates };
    if (currentSelected[day.dateString]) {
      delete currentSelected[day.dateString];
    } else {
      currentSelected[day.dateString] = { selected: true, selectedColor: '#27A745' };
    }
    setSelectedDates(currentSelected);
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      const dates = repeatSessions ? Object.keys(selectedDates) : ['2026-03-24'];
      const payload = dates.map(date => ({
        date,
        startTime: '11:30 AM', // hardcoded based on mock UI
        endTime: '11:45 AM',
        sessionName: 'PT'
      }));
      await postAPI('/availability', payload);
      Alert.alert('Success', 'Availability saved!');
      setSelectedDates({});
    } catch (error) {
      console.error('Failed to create availability', error);
      Alert.alert('Error', 'Failed to save');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Set Availability</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Date*</Text>
        <View style={styles.dateInputContainer}>
          <TextInput 
            style={styles.textInput}
            value="24 July 2024"
            editable={false}
          />
          <CalendarIcon color="#666" size={20} style={styles.calendarIcon} />
        </View>
      </View>

      <View style={styles.rowWrapper}>
        <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
          <Text style={styles.label}>Start Time*</Text>
          <TextInput 
            style={styles.textInput}
            value="11:30 AM"
          />
        </View>
        <View style={[styles.inputGroup, { flex: 1 }]}>
          <Text style={styles.label}>End Time*</Text>
          <TextInput 
            style={styles.textInput}
            value="11:45 AM"
          />
        </View>
      </View>

      <View style={styles.switchWrapper}>
        <Text style={styles.switchLabel}>Repeat Sessions</Text>
        <Switch 
          value={repeatSessions}
          onValueChange={setRepeatSessions}
          trackColor={{ false: "#767577", true: "#27A745" }}
          thumbColor={repeatSessions ? "#f4f3f4" : "#f4f3f4"}
        />
      </View>

      {repeatSessions && (
        <View style={styles.calendarContainer}>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={selectedDates}
            theme={{
              selectedDayBackgroundColor: '#27A745',
              todayTextColor: '#27A745',
              arrowColor: '#333',
            }}
          />
        </View>
      )}

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Session Name*</Text>
        <TextInput 
          style={styles.textInput}
          placeholder="e.g. PT"
        />
      </View>

      <TouchableOpacity style={styles.createButton} onPress={handleCreate} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.createButtonText}>Create</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: '#000',
  },
  inputGroup: {
    marginBottom: 16,
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calendarIcon: {
    position: 'absolute',
    right: 16,
  },
  switchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 20,
    overflow: 'hidden',
  },
  createButton: {
    backgroundColor: '#27A745',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
