import React from 'react';
import { View, Text, TextInput, TextInputProps, StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

interface LabeledInputProps extends TextInputProps {
    label: string;
}

export const LabeledInput: React.FC<LabeledInputProps> = ({ label, style, ...textInputProps }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput style={[styles.input, style]} {...textInputProps} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.textDark, 
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.textGray + '50',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 15,
        color: COLORS.textDark,
        backgroundColor: COLORS.bgSubtle,
    },
});
