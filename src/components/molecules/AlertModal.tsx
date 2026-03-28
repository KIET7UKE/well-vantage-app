import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
  Platform,
} from 'react-native';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react-native';
import { Typography } from '../atoms';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

export interface AlertButton {
  text: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
  icon?: any;
}

export interface AlertModalProps {
  visible: boolean;
  type?: AlertType;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  onClose?: () => void;
  closable?: boolean;
  showInput?: boolean;
  inputPlaceholder?: string;
  inputValue?: string;
  onInputChange?: (text: string) => void;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
}

import { COLORS } from '../../constants/colors';

const getIconConfig = (type: AlertType) => {
  switch (type) {
    case 'success':
      return {
        Icon: CheckCircle,
        color: COLORS.success,
        bgColor: COLORS.successLight,
      };
    case 'error':
      return {
        Icon: AlertCircle,
        color: COLORS.error,
        bgColor: COLORS.errorLight,
      };
    case 'warning':
      return {
        Icon: AlertTriangle,
        color: COLORS.warning,
        bgColor: COLORS.warningLight,
      };
    case 'info':
    case 'confirm':
    default:
      return {
        Icon: Info,
        color: COLORS.info,
        bgColor: COLORS.infoLight,
      };
  }
};

const AlertModal: React.FC<AlertModalProps> = ({
  visible,
  type = 'info',
  title,
  message,
  buttons = [{ text: 'OK', style: 'default' }],
  onClose,
  closable = true,
  showInput = false,
  inputPlaceholder = 'Type here...',
  inputValue = '',
  onInputChange,
  keyboardType = 'default',
}) => {
  const { Icon, color, bgColor } = getIconConfig(type);

  const handleButtonPress = (button: AlertButton) => {
    button.onPress?.();
    onClose?.();
  };

  const getButtonStyle = (style?: AlertButton['style']) => {
    switch (style) {
      case 'destructive':
        return {
          backgroundColor: COLORS.error,
          textColor: COLORS.white,
        };
      case 'cancel':
        return {
          backgroundColor: COLORS.bgSubtle,
          textColor: COLORS.textGray,
        };
      default:
        return {
          backgroundColor: COLORS.primary,
          textColor: COLORS.white,
        };
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={closable ? onClose : undefined}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.container}>
              {/* Close button */}
              {closable && (
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <X size={20} color={COLORS.gray400} />
                </TouchableOpacity>
              )}

              {/* Icon */}
              <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
                <Icon size={32} color={color} />
              </View>

              {/* Title */}
              <Typography
                variant="h3"
                weight="bold"
                color={COLORS.white}
                align="center"
                style={styles.title}
              >
                {title}
              </Typography>

              {/* Message */}
              {message && (
                <Typography
                  variant="body1"
                  color={COLORS.white90}
                  align="center"
                  style={styles.message}
                >
                  {message}
                </Typography>
              )}

              {/* Input field for prompts */}
              {showInput && (
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder={inputPlaceholder}
                    placeholderTextColor={COLORS.gray400}
                    value={inputValue}
                    onChangeText={onInputChange}
                    keyboardType={keyboardType}
                    autoFocus
                  />
                </View>
              )}

              {/* Buttons */}
              <View style={[styles.buttonContainer, buttons.length === 2 && styles.buttonRow]}>
                {buttons.map((button, index) => {
                  const { backgroundColor, textColor } = getButtonStyle(button.style);
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.button,
                        { backgroundColor },
                        buttons.length === 2 ? styles.buttonFlex : { width: '100%' },
                        { flexDirection: 'row', gap: 10 }
                      ]}
                      onPress={() => handleButtonPress(button)}
                      activeOpacity={0.8}
                    >
                      {button.icon && (
                        <View style={{ marginRight: 0 }}>
                          {React.isValidElement(button.icon) ? button.icon : <button.icon size={20} color={textColor} />}
                        </View>
                      )}
                      <Typography
                        variant="body1"
                        weight="semibold"
                        color={textColor}
                        align="center"
                      >
                        {button.text}
                      </Typography>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: COLORS.backdrop,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  container: {
    width: SCREEN_WIDTH - 48,
    maxWidth: 340,
    backgroundColor: COLORS.backgroundLight,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 4,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginBottom: 8,
  },
  message: {
    marginBottom: 24,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonFlex: {
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.bgSubtle,
    borderRadius: 12,
    paddingHorizontal: 16,
    color: COLORS.white,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    fontSize: 16,
  },
});

export default AlertModal;
