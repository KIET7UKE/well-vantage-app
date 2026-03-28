import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
  ViewStyle,
  ActivityIndicator,
  Text,
} from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface IconButtonProps {
  icon: LucideIcon;
  onPress?: () => void;
  size?: number;
  color?: string;
  badge?: number | boolean;
  badgeColor?: string;
  style?: ViewStyle;
  disabled?: boolean;
  loading?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  onPress,
  size = 24,
  color = '#374151',
  badge,
  badgeColor = '#ef4444',
  style,
  disabled = false,
  loading = false,
}) => {
  const badgeValue = typeof badge === 'number' ? badge : null;
  const showBadge = badgeValue !== null && badgeValue > 0;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={color} />
      ) : (
        <>
          <Icon size={size} color={color} />
          {showBadge && (
            <View
              style={[
                styles.badge,
                styles.numberBadge,
                { backgroundColor: badgeColor },
              ]}
            >
              <View style={styles.badgeContent}>
                {badgeValue! > 9 ? (
                  <View style={styles.badgeTextContainer}>
                    <Text style={styles.badgeText}>9+</Text>
                  </View>
                ) : (
                  <View style={styles.badgeTextContainer}>
                    <Text style={styles.badgeText}>{badgeValue}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
  },
  dotBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  numberBadge: {
    minWidth: 16,
    height: 16,
    borderRadius: 9,
    paddingHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
  },
});

export default IconButton;
