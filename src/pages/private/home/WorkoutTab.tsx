import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Trash2, Plus } from 'lucide-react-native';
import { getAPI, deleteAPI } from '../../../apis/api';
import { useIsFocused } from '@react-navigation/native';

interface WorkoutPlan {
  id: string;
  name: string;
}

interface WorkoutTabProps {
  onAddPress: () => void;
}

export const WorkoutTab = ({ onAddPress }: WorkoutTabProps) => {
  const isFocused = useIsFocused();
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    try {
      setLoading(true);
      const res = await getAPI<WorkoutPlan[]>('/workouts');
      setWorkoutPlans(res);
    } catch (error) {
      console.error('Failed to fetch workouts', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchWorkouts();
    }
  }, [isFocused]);

  const handleDelete = async (id: string) => {
    try {
      await deleteAPI(`/workouts/${id}`);
      fetchWorkouts();
    } catch (error) {
      console.error('Failed to delete workout', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Custom Workout Plans</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#27A745" style={{ marginTop: 20 }} />
        ) : (
          workoutPlans.map((plan) => (
            <View key={plan.id} style={styles.planCard}>
              <Text style={styles.planName}>{plan.name}</Text>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(plan.id)}>
                <Trash2 color="#E74C3C" size={20} />
              </TouchableOpacity>
            </View>
          ))
        )}

        <View style={styles.fabContainer}>
          <TouchableOpacity style={styles.fab} onPress={onAddPress}>
            <Plus color="#fff" size={24} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100, // Make room for FAB
  },
  sectionHeader: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 6,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  planName: {
    fontSize: 15,
    color: '#333333',
  },
  deleteButton: {
    padding: 4,
  },
  fabContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  fab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#27A745',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});
