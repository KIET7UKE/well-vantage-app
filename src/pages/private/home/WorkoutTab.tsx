import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator, 
  LayoutAnimation, 
  Platform, 
  UIManager 
} from 'react-native';
import { Trash2, Plus, ChevronDown, ChevronRight, Dumbbell } from 'lucide-react-native';
import { getAPI, deleteAPI } from '../../../apis/api';
import { useIsFocused } from '@react-navigation/native';
import { COLORS } from '../../../constants/colors';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface Exercise {
  name: string;
  sets: string;
  reps: string;
}

interface DayPlan {
  dayLabel: string;
  muscleGroup: string;
  exercises: Exercise[];
}

interface WorkoutPlan {
  id: string;
  name: string;
  notes?: string;
  days: DayPlan[];
}

interface WorkoutTabProps {
  onAddPress: () => void;
}

export const WorkoutTab = ({ onAddPress }: WorkoutTabProps) => {
  const isFocused = useIsFocused();
  const [workoutPlans, setWorkoutPlans] = useState<WorkoutPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null);

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

  const toggleAccordion = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedPlanId(expandedPlanId === id ? null : id);
  };

  const formatValue = (value: string, unit: string) => {
    if (!value) return '';
    // If the value already contains non-numeric characters (like "secs" or "mins"), return it as is
    if (/[a-zA-Z]/.test(value)) {
      return value;
    }
    // Otherwise, append the shorthand unit (s for sets, r for reps)
    return `${value}${unit}`;
  };

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
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
        ) : workoutPlans.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No workout plans yet. Add one to get started!</Text>
          </View>
        ) : (
          workoutPlans.map((plan) => {
            const isExpanded = expandedPlanId === plan.id;
            return (
              <View key={plan.id} style={styles.planCardWrapper}>
                <TouchableOpacity 
                  style={styles.planCard} 
                  onPress={() => toggleAccordion(plan.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.planHeaderLeft}>
                    {isExpanded ? (
                      <ChevronDown color={COLORS.primary} size={20} style={{ marginRight: 8 }} />
                    ) : (
                      <ChevronRight color={COLORS.textGray} size={20} style={{ marginRight: 8 }} />
                    )}
                    <Text style={[styles.planName, isExpanded && styles.planNameActive]}>
                      {plan.name}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(plan.id)}>
                    <Trash2 color={COLORS.red} size={18} />
                  </TouchableOpacity>
                </TouchableOpacity>

                {isExpanded && (
                  <View style={styles.planDetails}>
                    {plan.notes ? (
                      <View style={styles.notesBox}>
                        <Text style={styles.notesText}>{plan.notes}</Text>
                      </View>
                    ) : null}

                    {plan.days.map((day, dIdx) => (
                      <View key={dIdx} style={styles.daySection}>
                        <View style={styles.dayHeader}>
                          <Text style={styles.dayLabel}>{day.dayLabel}</Text>
                          <Text style={styles.muscleGroup}>{day.muscleGroup}</Text>
                        </View>
                        
                        {day.exercises.map((ex, eIdx) => (
                          <View key={eIdx} style={styles.exerciseItem}>
                            <Dumbbell color={COLORS.primary} size={14} style={{ marginRight: 8 }} />
                            <Text style={styles.exerciseName}>{ex.name}</Text>
                            <View style={styles.setsRepsContainer}>
                              <Text style={styles.setsRepsText}>
                                {formatValue(ex.sets, 's')} × {formatValue(ex.reps, 'r')}
                              </Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })
        )}

        <View style={styles.addBtnContainer}>
          <TouchableOpacity style={styles.addPlanButton} onPress={onAddPress}>
            <Plus color={COLORS.white} size={20} style={{ marginRight: 8 }} />
            <Text style={styles.addPlanButtonText}>Add New Workout Plan</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionHeader: {
    backgroundColor: COLORS.bgSubtle,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 13,
    color: COLORS.textGray,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: COLORS.gray400,
    textAlign: 'center',
    fontSize: 14,
  },
  planCardWrapper: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  planHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  planName: {
    fontSize: 16,
    color: COLORS.textDark,
    fontWeight: '600',
  },
  planNameActive: {
    color: COLORS.primary,
  },
  deleteButton: {
    padding: 8,
  },
  planDetails: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.bgSubtle,
  },
  notesBox: {
    backgroundColor: COLORS.warningLight,
    padding: 10,
    borderRadius: 6,
    marginTop: 12,
    marginBottom: 10,
  },
  notesText: {
    fontSize: 13,
    color: COLORS.textGray,
    fontStyle: 'italic',
  },
  daySection: {
    marginTop: 16,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
    paddingLeft: 8,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  muscleGroup: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '600',
    backgroundColor: COLORS.primaryLight,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 12,
  },
  exerciseName: {
    fontSize: 14,
    color: COLORS.gray700,
    flex: 1,
  },
  setsRepsContainer: {
    backgroundColor: COLORS.gray100,
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  setsRepsText: {
    fontSize: 12,
    color: COLORS.textGray,
    fontWeight: '500',
  },
  addBtnContainer: {
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 20,
  },
  addPlanButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  addPlanButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
});
