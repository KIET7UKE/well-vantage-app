import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { getAPI, deleteAPI } from '../../../apis/api';
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from '../../../constants/colors';

interface Slot {
  id: string;
  time: string;
  open: boolean;
  date: string;
}

export const BookSlotsTab = () => {
  const isFocused = useIsFocused();
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const [selectedDate, setSelectedDate] = useState(todayString);
  const [currentMonth, setCurrentMonth] = useState(todayString);
  const [slotsData, setSlotsData] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSlots = async () => {
    try {
      setLoading(true);
      const res = await getAPI<any[]>('/availability');
      const mapped = res.map((item: any) => ({
        id: item.id,
        time: `${item.startTime} - ${item.endTime}`,
        open: true,
        date: item.date
      }));
      setSlotsData(mapped);
    } catch (error) {
      console.error('Failed to fetch slots', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchSlots();
    }
  }, [isFocused]);

  const handleDelete = async (id: string) => {
    try {
      await deleteAPI(`/availability/${id}`);
      fetchSlots();
    } catch (error) {
      console.error('Failed to delete slot', error);
    }
  };

  const filteredSlots = slotsData.filter(s => s.date === selectedDate);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Book Client Slots</Text>

      <View style={styles.calendarContainer}>
        <Calendar
          current={currentMonth}
          onMonthChange={(month) => setCurrentMonth(month.dateString)}
          enableSwipeMonths={true}
          minDate={todayString}
          renderArrow={(direction: string) => (
            direction === 'left' ? <ChevronLeft color={COLORS.textDark} size={24} /> : <ChevronRight color={COLORS.textDark} size={24} />
          )}
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: { selected: true, selectedColor: COLORS.primary }
          }}
          theme={{
            selectedDayBackgroundColor: COLORS.primary,
            todayTextColor: COLORS.primary,
            arrowColor: COLORS.textDark,
            textDisabledColor: COLORS.gray300,
          }}
        />
      </View>

      <View style={styles.slotsSection}>
        <Text style={styles.sectionTitle}>Available Slots:</Text>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : filteredSlots.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: 10, color: COLORS.textGray }}>No slots for this date</Text>
        ) : (
          filteredSlots.map((slot) => (
            <View key={slot.id} style={styles.slotRow}>
              <View style={styles.timeBox}>
                <Text style={styles.timeText}>{slot.time}</Text>
              </View>
              <View style={styles.badgeBox}>
                <Text style={styles.badgeText}>Open</Text>
              </View>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(slot.id)}>
                <Trash2 color={COLORS.red} size={20} />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 24,
    color: COLORS.textDark,
  },
  calendarContainer: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    marginBottom: 30,
    overflow: 'hidden',
  },
  slotsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '600',
    marginBottom: 16,
  },
  slotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  timeBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  timeText: {
    fontSize: 14,
    color: COLORS.textDark,
    textAlign: 'center',
  },
  badgeBox: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 4,
  },
  footerNote: {
    fontSize: 10,
    color: '#E74C3C',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
});
