import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Switch, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  Alert, 
  Pressable, 
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { postAPI } from '../../../apis/api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export const AvailabilityTab = () => {
  const [loading, setLoading] = useState(false);
  const [repeatSessions, setRepeatSessions] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ [date: string]: any }>({});
  
  // Selection states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date(new Date().getTime() + 15 * 60000)); // Default 15 mins later
  const [sessionName, setSessionName] = useState('PT');
  
  // Picker visibility
  const [pickerMode, setPickerMode] = useState<'date' | 'start' | 'end' | null>(null);

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];
  const [currentMonth, setCurrentMonth] = useState(todayString);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  };

  const mainDateStr = selectedDate.toISOString().split('T')[0];

  const handleDayPress = (day: any) => {
    if (day.dateString < todayString) return;
    if (day.dateString === mainDateStr) return; // Main date is mandatory
    
    const currentSelected = { ...selectedDates };
    if (currentSelected[day.dateString]) {
      delete currentSelected[day.dateString];
    } else {
      currentSelected[day.dateString] = { selected: true, selectedColor: '#27A745' };
    }
    setSelectedDates(currentSelected);
  };

  const handleConfirm = (date: Date) => {
    if (pickerMode === 'date') {
      setSelectedDate(date);
    } else if (pickerMode === 'start') {
      setStartTime(date);
      // Automatically adjust end time if it's before start time
      if (endTime < date) {
        setEndTime(new Date(date.getTime() + 15 * 60000));
      }
    } else if (pickerMode === 'end') {
      setEndTime(date);
    }
    setPickerMode(null);
  };

  const handleCreate = async () => {
    try {
      setLoading(true);
      
      // Determine which dates to use
      const dates = repeatSessions 
        ? Array.from(new Set([mainDateStr, ...Object.keys(selectedDates)]))
        : [mainDateStr];

      if (dates.length === 0) {
        Alert.alert('Selection Error', 'Please select at least one date.');
        setLoading(false);
        return;
      }

      const payload = dates.map(date => ({
        date,
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
        sessionName: sessionName
      }));

      await postAPI('/availability', payload);
      Alert.alert('Success', 'Availability saved!');
      if (repeatSessions) setSelectedDates({});
    } catch (error) {
      console.error('Failed to create availability', error);
      Alert.alert('Error', 'Failed to save availability');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Set Availability</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date*</Text>
          <Pressable 
            style={styles.selectorContainer} 
            onPress={() => setPickerMode('date')}
          >
            <Text style={styles.selectorValue}>{formatDate(selectedDate)}</Text>
            <CalendarIcon color="#666" size={20} style={styles.rightIcon} />
          </Pressable>
        </View>

        <View style={styles.rowWrapper}>
          <View style={[styles.inputGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>Start Time*</Text>
            <Pressable 
              style={styles.selectorContainer} 
              onPress={() => setPickerMode('start')}
            >
              <Text style={styles.selectorValue}>{formatTime(startTime)}</Text>
              <Clock color="#666" size={18} style={styles.rightIcon} />
            </Pressable>
          </View>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>End Time*</Text>
            <Pressable 
              style={styles.selectorContainer} 
              onPress={() => setPickerMode('end')}
            >
              <Text style={styles.selectorValue}>{formatTime(endTime)}</Text>
              <Clock color="#666" size={18} style={styles.rightIcon} />
            </Pressable>
          </View>
        </View>

        <DateTimePickerModal
          isVisible={pickerMode !== null}
          mode={pickerMode === 'date' ? 'date' : 'time'}
          date={
            pickerMode === 'date' ? selectedDate : 
            pickerMode === 'start' ? startTime : endTime
          }
          minimumDate={pickerMode === 'date' ? new Date() : undefined}
          onConfirm={handleConfirm}
          onCancel={() => setPickerMode(null)}
        />

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
          <View style={styles.calendarSection}>
            <Text style={styles.sectionLabel}>Select Multiple Dates:</Text>
            <View style={styles.calendarContainer}>
              <Calendar
                current={currentMonth}
                onMonthChange={(month: any) => setCurrentMonth(month.dateString)}
                enableSwipeMonths={true}
                renderArrow={(direction: string) => (
                  direction === 'left' ? <ChevronLeft color="#333" size={24} /> : <ChevronRight color="#333" size={24} />
                )}
                onDayPress={handleDayPress}
                markedDates={{
                  ...selectedDates,
                  [mainDateStr]: { selected: true, selectedColor: '#27A745', disableTouchEvent: true }
                }}
                minDate={todayString}
                theme={{
                  selectedDayBackgroundColor: '#27A745',
                  todayTextColor: '#27A745',
                  textDisabledColor: '#d9e1e8',
                  arrowColor: '#333',
                }}
              />
            </View>
          </View>
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Session Name*</Text>
          <TextInput 
            style={styles.textInput}
            placeholder="e.g. PT"
            value={sessionName}
            onChangeText={setSessionName}
          />
        </View>

        <TouchableOpacity style={styles.createButton} onPress={handleCreate} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.createButtonText}>Create</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 30,
    color: '#1A1A1A',
  },
  inputGroup: {
    marginBottom: 20,
  },
  rowWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    marginBottom: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#F9F9F9',
    justifyContent: 'space-between',
  },
  selectorValue: {
    fontSize: 15,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  rightIcon: {
    marginLeft: 10,
  },
  textInput: {
    borderWidth: 1.5,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1A1A1A',
    backgroundColor: '#F9F9F9',
  },
  switchWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: '#F5F5F5',
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '600',
  },
  calendarSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    fontWeight: '500',
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  createButton: {
    backgroundColor: '#27A745',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
    shadowColor: '#27A745',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '700',
  },
});
