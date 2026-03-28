import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TouchableOpacity, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/rootStackParamList';
import { CustomHeader } from '../../../components/CustomHeader';
import { WorkoutTab } from './WorkoutTab';
import { AvailabilityTab } from './AvailabilityTab';
import { BookSlotsTab } from './BookSlotsTab';

const { width, height } = Dimensions.get('window');

export const Home = () => {
  const [activeTab, setActiveTab] = useState<'Workout' | 'Availability' | 'Book Slots'>('Workout');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Workout':
        return <WorkoutTab onAddPress={() => navigation.navigate('AddWorkoutPlan')} />;
      case 'Availability':
        return <AvailabilityTab />;
      case 'Book Slots':
        return <BookSlotsTab />;
      default:
        return null;
    }
  };

  const tabs: ('Workout' | 'Availability' | 'Book Slots')[] = ['Workout', 'Availability', 'Book Slots'];

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Workout Management" 
        onMenuPress={() => setSidebarOpen(true)}
      />

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTabButton]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.contentContainer}>
        {renderTabContent()}
      </View>

      <Modal visible={isSidebarOpen} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback onPress={() => setSidebarOpen(false)}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>
          <View style={styles.sidebar}>
            <View style={styles.sidebarHeader}>
              <Text style={styles.sidebarTitle}>WellVantage</Text>
            </View>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setActiveTab('Workout'); setSidebarOpen(false); }}>
              <Text style={styles.sidebarItemText}>Workouts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setActiveTab('Availability'); setSidebarOpen(false); }}>
              <Text style={styles.sidebarItemText}>Availability</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sidebarItem} onPress={() => { setActiveTab('Book Slots'); setSidebarOpen(false); }}>
              <Text style={styles.sidebarItemText}>Book Slots</Text>
            </TouchableOpacity>
            <View style={styles.sidebarFooter}>
              <TouchableOpacity onPress={() => { setSidebarOpen(false); navigation.replace("Login"); }}>
                <Text style={styles.logoutText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    backgroundColor: '#ffffff',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTabButton: {
    borderBottomColor: '#27A745',
  },
  tabText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#27A745',
    fontWeight: '700',
  },
  contentContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    flexDirection: 'row',
  },
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sidebar: {
    width: width * 0.75,
    height: '100%',
    backgroundColor: '#ffffff',
    paddingTop: 50,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  sidebarHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 10,
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#27A745',
  },
  sidebarItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  sidebarItemText: {
    fontSize: 16,
    color: '#333333',
  },
  sidebarFooter: {
    marginTop: 'auto',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 40,
  },
  logoutText: {
    fontSize: 16,
    color: '#E74C3C',
    fontWeight: '600',
  },
});
