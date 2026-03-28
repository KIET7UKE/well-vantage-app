import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

interface BottomModalPickerProps {
  isVisible: boolean;
  mode: 'date' | 'time';
  value: Date;
  onConfirm: (date: Date) => void;
  onCancel: () => void;
  title?: string;
}

export const BottomModalPicker: React.FC<BottomModalPickerProps> = ({
  isVisible,
  mode,
  value,
  onConfirm,
  onCancel,
  title,
}) => {
  const [tempDate, setTempDate] = useState(value);

  // Update tempDate when value prop changes or when modal is shown
  useEffect(() => {
    if (isVisible) {
      setTempDate(value);
    }
  }, [isVisible, value]);

  const handleConfirm = () => {
    onConfirm(tempDate);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onCancel}
      onSwipeComplete={onCancel}
      swipeDirection="down"
      style={styles.modal}
      backdropOpacity={0.4}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriverForBackdrop
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onCancel} style={styles.button}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          
          <Text style={styles.title}>{title || (mode === 'date' ? 'Select Date' : 'Select Time')}</Text>
          
          <TouchableOpacity onPress={handleConfirm} style={styles.button}>
            <Text style={styles.confirmText}>Confirm</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.pickerContainer}>
          <DateTimePicker
            value={tempDate}
            mode={mode}
            is24Hour={false}
            display={Platform.OS === 'ios' ? 'spinner' : 'spinner'} // Force spinner for bottom sheet feel
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                setTempDate(selectedDate);
              }
            }}
            textColor="#000000"
            style={styles.picker}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  button: {
    padding: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  cancelText: {
    fontSize: 16,
    color: '#FF3B30',
  },
  confirmText: {
    fontSize: 16,
    color: '#27A745',
    fontWeight: '600',
  },
  pickerContainer: {
    height: 250,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  picker: {
    height: 216,
    width: '100%',
  },
});
