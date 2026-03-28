import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/rootStackParamList';
import { CustomHeader } from '../../../components/CustomHeader';
import { Trash2, Plus } from 'lucide-react-native';
import { postAPI } from '../../../apis/api';

interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
}

interface DayPlan {
  id: string;
  dayLabel: string;
  muscleGroup: string;
  exercises: Exercise[];
}

export const AddWorkoutPlan = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [planName, setPlanName] = useState('');
  const [notes, setNotes] = useState('');
  const [days, setDays] = useState<DayPlan[]>([
    {
      id: Date.now().toString(),
      dayLabel: 'Day 1',
      muscleGroup: '',
      exercises: [{ id: Date.now().toString() + 'e', name: '', sets: '', reps: '' }],
    },
  ]);

  const addDay = () => {
    setDays([...days, {
      id: Date.now().toString(),
      dayLabel: `Day ${days.length + 1}`,
      muscleGroup: '',
      exercises: [{ id: Date.now().toString() + 'e', name: '', sets: '', reps: '' }],
    }]);
  };

  const removeDay = (dayId: string) => {
    setDays(days.filter(d => d.id !== dayId));
  };

  const updateDay = (dayId: string, field: keyof DayPlan, value: string) => {
    setDays(days.map(d => d.id === dayId ? { ...d, [field]: value } : d));
  };

  const addExercise = (dayId: string) => {
    setDays(days.map(d => {
      if (d.id === dayId) {
        return { ...d, exercises: [...d.exercises, { id: Date.now().toString(), name: '', sets: '', reps: '' }] };
      }
      return d;
    }));
  };

  const removeExercise = (dayId: string, exerciseId: string) => {
    setDays(days.map(d => {
      if (d.id === dayId) {
        return { ...d, exercises: d.exercises.filter(e => e.id !== exerciseId) };
      }
      return d;
    }));
  };

  const updateExercise = (dayId: string, exerciseId: string, field: keyof Exercise, value: string) => {
    setDays(days.map(d => {
      if (d.id === dayId) {
        return {
          ...d,
          exercises: d.exercises.map(e => e.id === exerciseId ? { ...e, [field]: value } : e)
        };
      }
      return d;
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // Validation
      if (!planName.trim()) {
        Alert.alert('Validation Error', 'Please enter a plan name.');
        setLoading(false);
        return;
      }

      if (days.length === 0) {
        Alert.alert('Validation Error', 'Please add at least one day to your plan.');
        setLoading(false);
        return;
      }

      for (const day of days) {
        if (!day.muscleGroup.trim()) {
          Alert.alert('Validation Error', `Please enter a muscle group for ${day.dayLabel}.`);
          setLoading(false);
          return;
        }
        if (day.exercises.length === 0) {
          Alert.alert('Validation Error', `Please add at least one exercise for ${day.dayLabel}.`);
          setLoading(false);
          return;
        }
        for (const exercise of day.exercises) {
          if (!exercise.name.trim()) {
            Alert.alert('Validation Error', `Please enter a name for all exercises in ${day.dayLabel}.`);
            setLoading(false);
            return;
          }
          if (!exercise.sets.trim() || !exercise.reps.trim()) {
            Alert.alert('Validation Error', `Please enter sets and reps for "${exercise.name || 'all exercises'}" in ${day.dayLabel}.`);
            setLoading(false);
            return;
          }
        }
      }

      const payload = {
        name: planName,
        notes,
        days: days.map(d => ({
          dayLabel: d.dayLabel,
          muscleGroup: d.muscleGroup,
          exercises: d.exercises.map(e => ({
            name: e.name,
            sets: e.sets,
            reps: e.reps
          }))
        }))
      };
      await postAPI('/workouts', payload);
      navigation.goBack();
    } catch (error) {
      console.error('Failed to save workout status', error);
      // Failsafe UI navigation
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const remainingWords = 45 - (notes.trim() === '' ? 0 : notes.trim().split(/\s+/).length);

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomHeader 
        title="Add Workout Plan" 
        showBack={true} 
        onBackPress={() => navigation.goBack()} 
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          <TextInput
            style={styles.planNameInput}
            placeholder="E.g. Beginner's Workout - 3 days"
            placeholderTextColor="#999"
            value={planName}
            onChangeText={setPlanName}
          />

          {days.map((day, dayIndex) => (
            <View key={day.id} style={styles.dayContainer}>
              <View style={styles.dayHeader}>
                <View style={styles.dayBadge}>
                  <Text style={styles.dayBadgeText}>{day.dayLabel}</Text>
                </View>
                <TextInput
                  style={styles.muscleInput}
                  placeholder="e.g. Chest"
                  placeholderTextColor="#999"
                  value={day.muscleGroup}
                  onChangeText={(val) => updateDay(day.id, 'muscleGroup', val)}
                />
                <TouchableOpacity onPress={() => removeDay(day.id)}>
                  <Trash2 color="#E74C3C" size={20} />
                </TouchableOpacity>
              </View>

              <View style={styles.exerciseListHeader}>
                <Text style={styles.columnLabel}>Sets</Text>
                <Text style={styles.columnLabel}>Reps</Text>
              </View>

              {day.exercises.map((exercise) => (
                <View key={exercise.id} style={styles.exerciseRow}>
                  <TextInput
                    style={[styles.exerciseInput, { flex: 2 }]}
                    placeholder="Exercise name (e.g. Bench Press)"
                    placeholderTextColor="#999"
                    value={exercise.name}
                    onChangeText={(val) => updateExercise(day.id, exercise.id, 'name', val)}
                  />
                  <TextInput
                    style={styles.numberInput}
                    placeholder="Sets"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={exercise.sets}
                    onChangeText={(val) => updateExercise(day.id, exercise.id, 'sets', val)}
                  />
                  <TextInput
                    style={styles.numberInput}
                    placeholder="Reps"
                    placeholderTextColor="#999"
                    value={exercise.reps}
                    onChangeText={(val) => updateExercise(day.id, exercise.id, 'reps', val)}
                  />
                  <TouchableOpacity onPress={() => removeExercise(day.id, exercise.id)} style={{ marginLeft: 8 }}>
                    <Trash2 color="#E74C3C" size={20} />
                  </TouchableOpacity>
                </View>
              ))}

              <View style={styles.addExerciseContainer}>
                <TouchableOpacity style={styles.addExerciseBtn} onPress={() => addExercise(day.id)}>
                  <Plus color="#fff" size={16} />
                </TouchableOpacity>
              </View>
            </View>
          ))}

          <View style={styles.addDayContainer}>
            <TouchableOpacity style={styles.addDayBtn} onPress={addDay}>
              <Plus color="#fff" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.notesContainer}>
            <TextInput
              style={styles.notesInput}
              placeholder="Additional notes: (e.g. Bench Press: www.example.com)"
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              value={notes}
              onChangeText={setNotes}
              textAlignVertical="top"
            />
            <Text style={styles.wordCount}>{remainingWords} words remaining</Text>
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Submit</Text>}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#27A745',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 20,
  },
  planNameInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 24,
    color: '#333',
  },
  dayContainer: {
    marginBottom: 30,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dayBadge: {
    backgroundColor: '#27A745',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  dayBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  muscleInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
    fontSize: 14,
    color: '#333',
  },
  exerciseListHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 36, // account for trash icon width
    marginBottom: 8,
  },
  columnLabel: {
    fontSize: 12,
    color: '#666',
    width: 50,
    textAlign: 'center',
    marginLeft: 8,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  exerciseInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
  },
  numberInput: {
    borderWidth: 1,
    borderColor: '#27A745',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 10,
    fontSize: 14,
    width: 50,
    textAlign: 'center',
    marginLeft: 8,
    color: '#333',
  },
  addExerciseContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  addExerciseBtn: {
    backgroundColor: '#27A745',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addDayContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  addDayBtn: {
    backgroundColor: '#27A745',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesContainer: {
    marginBottom: 30,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    height: 100,
    fontSize: 14,
    color: '#333',
  },
  wordCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#F39C12',
    marginTop: 8,
  },
  submitButton: {
    backgroundColor: '#27A745',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
