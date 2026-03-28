import React from "react";
import { Text, StyleSheet, TextStyle, TextProps } from "react-native";

interface TypographyProps extends TextProps {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "body1"
    | "body2"
    | "caption"
    | "overline";
  color?: string;
  weight?: "regular" | "medium" | "semibold" | "bold" | "extrabold";
  align?: "left" | "center" | "right";
  style?: TextStyle;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "body1",
  color = "#374151",
  weight = "regular",
  align = "left",
  style,
  children,
  ...props
}) => {
  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        styles[weight],
        { color, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
  h1: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "800",
  },
  h2: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "800",
  },
  h3: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
  },
  h4: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },
  h5: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "700",
  },
  h6: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "700",
  },
  h7: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "700",
  },
  h8: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
  },
  body1: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
  },
  body2: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "400",
  },
  overline: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  regular: {
    fontWeight: "400",
  },
  medium: {
    fontWeight: "500",
  },
  semibold: {
    fontWeight: "600",
  },
  bold: {
    fontWeight: "700",
  },
  extrabold: {
    fontWeight: "800",
  },
});

export default Typography;
