import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps {
  children: React.ReactNode;
  safe?: boolean;
  style?: ViewStyle;
  backgroundColor?: string;
}

const Container: React.FC<ContainerProps> = ({
  children,
  safe = true,
  style,
  backgroundColor = '#ffffff',
}) => {
  const Component = safe ? SafeAreaView : View;

  return (
    <Component style={[styles.container, { backgroundColor }, style]}>
      {children}
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Container;
