import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Menu, RotateCcw, ArrowLeft, RefreshCw } from 'lucide-react-native';

interface CustomHeaderProps {
  title: string;
  onMenuPress?: () => void;
  onRefreshPress?: () => void;
  onBackPress?: () => void;
  showBack?: boolean;
}

export const CustomHeader = ({
  title,
  onMenuPress,
  onRefreshPress,
  onBackPress,
  showBack = false,
}: CustomHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={showBack ? onBackPress : onMenuPress}
      >
        {showBack ? (
          <ArrowLeft color="#fff" size={24} />
        ) : (
          <Menu color="#fff" size={24} />
        )}
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.iconButton} onPress={onRefreshPress}>
        <RefreshCw color="#fff" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#27A745', // Brand green
    paddingTop: Platform.OS === 'ios' ? 50 : 20, // Approximate status bar height for custom header
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  iconButton: {
    padding: 8,
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
