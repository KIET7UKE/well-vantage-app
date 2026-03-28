import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Menu, RotateCcw, ArrowLeft, RefreshCw } from 'lucide-react-native';
import { COLORS } from '../constants/colors';

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
          <ArrowLeft color={COLORS.white} size={24} />
        ) : (
          <Menu color={COLORS.white} size={24} />
        )}
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity style={styles.iconButton} onPress={onRefreshPress}>
        <RefreshCw color={COLORS.white} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  iconButton: {
    padding: 8,
  },
  title: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
});
