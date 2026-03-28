import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react-native';
import { Typography } from '../atoms';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  visible: boolean;
  type?: ToastType;
  message: string;
  duration?: number;
  onClose?: () => void;
  position?: 'top' | 'bottom';
}

import { COLORS } from '../../constants/colors';

const getToastConfig = (type: ToastType) => {
  switch (type) {
    case 'success':
      return {
        Icon: CheckCircle,
        iconColor: COLORS.success,
        backgroundColor: COLORS.successBg,
        borderColor: COLORS.successBorder,
      };
    case 'error':
      return {
        Icon: AlertCircle,
        iconColor: COLORS.error,
        backgroundColor: COLORS.errorBg,
        borderColor: COLORS.errorBorder,
      };
    case 'warning':
      return {
        Icon: AlertTriangle,
        iconColor: COLORS.warning,
        backgroundColor: COLORS.warningBg,
        borderColor: COLORS.warningBorder,
      };
    case 'info':
    default:
      return {
        Icon: Info,
        iconColor: COLORS.info,
        backgroundColor: COLORS.infoBg,
        borderColor: COLORS.infoBorder,
      };
  }
};

const Toast: React.FC<ToastProps> = ({
  visible,
  type = 'info',
  message,
  duration = 3000,
  onClose,
  position = 'top',
}) => {
  const translateY = useRef(new Animated.Value(position === 'top' ? -100 : 100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Animate in
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Auto dismiss
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);

        return () => clearTimeout(timer);
      }
    }
  }, [visible, duration]);

  const handleClose = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: position === 'top' ? -100 : 100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onClose?.();
    });
  };

  if (!visible) return null;

  const { Icon, iconColor, backgroundColor, borderColor } = getToastConfig(type);

  return (
    <Animated.View
      style={[
        styles.container,
        position === 'top' ? styles.positionTop : styles.positionBottom,
        {
          transform: [{ translateY }],
          opacity,
          backgroundColor,
          borderColor,
        },
      ]}
    >
      <View style={styles.content}>
        <Icon size={22} color={iconColor} />
        <Typography
          variant="body2"
          weight="medium"
          color={COLORS.gray700}
          style={styles.message}
          numberOfLines={3}
        >
          {message}
        </Typography>
      </View>
      <TouchableOpacity
        onPress={handleClose}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        style={styles.closeButton}
      >
        <X size={18} color={COLORS.gray400} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    maxWidth: SCREEN_WIDTH - 32,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 9999,
  },
  positionTop: {
    top: 60,
  },
  positionBottom: {
    bottom: 100,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  message: {
    flex: 1,
    lineHeight: 20,
  },
  closeButton: {
    marginLeft: 8,
    padding: 4,
  },
});

export default Toast;
