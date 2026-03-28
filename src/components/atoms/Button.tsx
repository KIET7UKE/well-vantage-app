import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import Typography from "./Typography";

import { COLORS } from '../../constants/colors';

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "dangerOutline";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  /** Button text content */
  title: string;
  /** Called when the button is pressed */
  onPress: () => void;
  /** Button variant style */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** If true, shows loading indicator and disables button */
  loading?: boolean;
  /** If true, disables the button */
  disabled?: boolean;
  /** Icon component to display before the title */
  leftIcon?: React.ReactNode;
  /** Icon component to display after the title */
  rightIcon?: React.ReactNode;
  /** If true, renders a full width button */
  fullWidth?: boolean;
  /** Custom style for the button container */
  style?: StyleProp<ViewStyle>;
  /** Custom style for the button text */
  textStyle?: StyleProp<TextStyle>;
  /** Active opacity when pressed */
  activeOpacity?: number;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  activeOpacity = 0.8,
}) => {
  const isDisabled = disabled || loading;

  const getContainerStyle = (): ViewStyle[] => {
    const baseStyles: ViewStyle[] = [styles.base, styles[`size_${size}`]];

    // Variant styles
    switch (variant) {
      case "primary":
        baseStyles.push(styles.primaryContainer);
        if (isDisabled) baseStyles.push(styles.primaryDisabled);
        break;
      case "secondary":
        baseStyles.push(styles.secondaryContainer);
        if (isDisabled) baseStyles.push(styles.secondaryDisabled);
        break;
      case "outline":
        baseStyles.push(styles.outlineContainer);
        if (isDisabled) baseStyles.push(styles.outlineDisabled);
        break;
      case "ghost":
        baseStyles.push(styles.ghostContainer);
        if (isDisabled) baseStyles.push(styles.ghostDisabled);
        break;
      case "danger":
        baseStyles.push(styles.dangerContainer);
        if (isDisabled) baseStyles.push(styles.dangerDisabled);
        break;
      case "dangerOutline":
        baseStyles.push(styles.dangerOutlineContainer);
        if (isDisabled) baseStyles.push(styles.dangerOutlineDisabled);
        break;
    }

    if (fullWidth) {
      baseStyles.push(styles.fullWidth);
    }

    return baseStyles;
  };

  const getTextColor = (): string => {
    if (isDisabled) {
      switch (variant) {
        case "outline":
        case "ghost":
        case "dangerOutline":
          return COLORS.gray400;
        default:
          return COLORS.white;
      }
    }

    switch (variant) {
      case "primary":
      case "secondary":
      case "danger":
        return COLORS.white;
      case "outline":
        return COLORS.primary;
      case "ghost":
        return COLORS.gray600;
      case "dangerOutline":
        return COLORS.danger;
      default:
        return COLORS.white;
    }
  };

  const getTextWeight = (): "regular" | "medium" | "semibold" | "bold" => {
    return size === "large" ? "bold" : "semibold";
  };

  const getTextVariant = (): "body1" | "body2" | "caption" => {
    switch (size) {
      case "small":
        return "body2";
      case "large":
        return "body1";
      default:
        return "body1";
    }
  };

  const getLoaderColor = (): string => {
    switch (variant) {
      case "outline":
        return COLORS.primary;
      case "ghost":
        return COLORS.gray500;
      case "dangerOutline":
        return COLORS.danger;
      default:
        return COLORS.white;
    }
  };

  const getLoaderSize = (): "small" | "large" => {
    return size === "small" ? "small" : "small";
  };

  return (
    <TouchableOpacity
      style={[getContainerStyle(), style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={activeOpacity}
    >
      {loading ? (
        <ActivityIndicator color={getLoaderColor()} size={getLoaderSize()} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
          <Typography
            variant={getTextVariant()}
            weight={getTextWeight()}
            color={getTextColor()}
            style={textStyle as any}
          >
            {title}
          </Typography>
          {rightIcon && <View style={styles.rightIcon}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
  fullWidth: {
    width: "100%",
  },

  // Size variants
  size_small: {
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  size_medium: {
    height: 48,
    paddingHorizontal: 20,
  },
  size_large: {
    height: 56,
    paddingHorizontal: 24,
  },

  // Primary variant
  primaryContainer: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryDisabled: {
    backgroundColor: COLORS.gray400,
    shadowOpacity: 0,
    elevation: 0,
  },

  // Secondary variant
  secondaryContainer: {
    backgroundColor: COLORS.primaryDark,
  },
  secondaryDisabled: {
    backgroundColor: COLORS.gray400,
  },

  // Outline variant
  outlineContainer: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  outlineDisabled: {
    borderColor: COLORS.gray300,
  },

  // Ghost variant
  ghostContainer: {
    backgroundColor: "transparent",
  },
  ghostDisabled: {
    opacity: 0.5,
  },

  // Danger variant
  dangerContainer: {
    backgroundColor: COLORS.danger,
  },
  dangerDisabled: {
    backgroundColor: COLORS.gray400,
  },

  // Danger Outline variant
  dangerOutlineContainer: {
    backgroundColor: COLORS.dangerLight,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  dangerOutlineDisabled: {
    borderColor: COLORS.gray300,
    backgroundColor: COLORS.gray100,
  },
});

export default Button;
