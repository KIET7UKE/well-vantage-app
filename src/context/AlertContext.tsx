import React, { createContext, useContext, useState, useCallback, ReactNode, useRef } from 'react';
import { View, StyleSheet, Platform, ToastAndroid } from 'react-native';
import AlertModal, { AlertType, AlertButton } from '../components/molecules/AlertModal';
import Toast, { ToastType } from '../components/molecules/Toast';

// Alert configuration
interface AlertConfig {
  type?: AlertType;
  title: string;
  message?: string;
  buttons?: AlertButton[];
  closable?: boolean;
  showInput?: boolean;
  inputPlaceholder?: string;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  onInputChange?: (text: string) => void;
}

// Toast configuration
interface ToastConfig {
  type?: ToastType;
  message: string;
  duration?: number;
  position?: 'top' | 'bottom';
}

// Context interface
interface AlertContextType {
  // Alert methods
  showAlert: (config: AlertConfig) => void;
  hideAlert: () => void;
  
  // Toast methods
  showToast: (config: ToastConfig) => void;
  hideToast: () => void;
  
  // Convenience methods for common alerts
  confirm: (
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText?: string,
    cancelText?: string,
    destructive?: boolean
  ) => void;
  
  // Convenience methods for common toasts (Non-blocking)
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;

  // Convenience methods for Actionable Notifications (Modal-like)
  showActionSuccess: (title: string, message?: string, onConfirm?: () => void) => void;
  showActionError: (title: string, message?: string) => void;

  // Prompt methods
  prompt: (
    title: string,
    message: string,
    onConfirm: (value: string) => void,
    onCancel?: () => void,
    placeholder?: string,
    defaultValue?: string,
    keyboardType?: 'default' | 'numeric'
  ) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
  // Alert state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertConfig>({
    title: '',
  });

  // Prompt logic state
  const [inputValue, setInputValue] = useState('');
  const inputValueRef = useRef('');

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastConfig, setToastConfig] = useState<ToastConfig>({
    message: '',
  });

  // Alert methods
  const showAlert = useCallback((config: AlertConfig) => {
    setAlertConfig(config);
    setAlertVisible(true);
  }, []);

  const hideAlert = useCallback(() => {
    setAlertVisible(false);
  }, []);

  // Toast methods
  const showToast = useCallback((config: ToastConfig) => {
    // If a toast is already visible, hide it first
    if (toastVisible) {
      setToastVisible(false);
      setTimeout(() => {
        setToastConfig(config);
        setToastVisible(true);
      }, 300);
    } else {
      setToastConfig(config);
      setToastVisible(true);
    }
  }, [toastVisible]);

  const hideToast = useCallback(() => {
    setToastVisible(false);
  }, []);

  // Convenience method for confirmation dialogs
  const confirm = useCallback((
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    destructive = false
  ) => {
    showAlert({
      type: 'confirm',
      title,
      message,
      buttons: [
        {
          text: cancelText,
          style: 'cancel',
          onPress: onCancel,
        },
        {
          text: confirmText,
          style: destructive ? 'destructive' : 'default',
          onPress: onConfirm,
        },
      ],
    });
  }, [showAlert]);

  // Convenience methods for toasts (Non-blocking)
  const success = useCallback((message: string, duration = 3000) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      showToast({ type: 'success', message, duration });
    }
  }, [showToast]);

  const error = useCallback((message: string, duration = 4000) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.LONG);
    } else {
      showToast({ type: 'error', message, duration });
    }
  }, [showToast]);

  const warning = useCallback((message: string, duration = 3500) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      showToast({ type: 'warning', message, duration });
    }
  }, [showToast]);

  const info = useCallback((message: string, duration = 3000) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      showToast({ type: 'info', message, duration });
    }
  }, [showToast]);

  // Convenience methods for Actionable Notifications (Modal-like)
  const showActionSuccess = useCallback((title: string, message?: string, onConfirm?: () => void) => {
    showAlert({
      type: 'success',
      title,
      message,
      buttons: [{ text: 'Great!', onPress: onConfirm }],
    });
  }, [showAlert]);

  const showActionError = useCallback((title: string, message?: string) => {
    showAlert({
      type: 'error',
      title,
      message,
      buttons: [{ text: 'OK' }],
    });
  }, [showAlert]);

  // Prompt implementation
  const prompt = useCallback((
    title: string,
    message: string,
    onConfirm: (value: string) => void,
    onCancel?: () => void,
    placeholder = 'Type here...',
    defaultValue = '',
    keyboardType: 'default' | 'numeric' = 'default'
  ) => {
    setInputValue(defaultValue);
    inputValueRef.current = defaultValue;

    showAlert({
      type: 'confirm',
      title,
      message,
      showInput: true,
      inputPlaceholder: placeholder,
      keyboardType,
      buttons: [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: onCancel,
        },
        {
          text: 'Confirm',
          onPress: () => onConfirm(inputValueRef.current),
        },
      ],
    });
  }, [showAlert]);

  const handleInputChange = useCallback((text: string) => {
    setInputValue(text);
    inputValueRef.current = text;
  }, []);

  const contextValue: AlertContextType = {
    showAlert,
    hideAlert,
    showToast,
    hideToast,
    confirm,
    success,
    error,
    warning,
    info,
    showActionSuccess,
    showActionError,
    prompt,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
      
      {/* Global Alert Modal */}
      <AlertModal
        visible={alertVisible}
        type={alertConfig.type}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={alertConfig.buttons}
        onClose={hideAlert}
        closable={alertConfig.closable}
        showInput={alertConfig.showInput}
        inputPlaceholder={alertConfig.inputPlaceholder}
        keyboardType={alertConfig.keyboardType}
        inputValue={inputValue}
        onInputChange={handleInputChange}
      />
      
      {/* Global Toast */}
      <View style={styles.toastContainer} pointerEvents="box-none">
        <Toast
          visible={toastVisible}
          type={toastConfig.type}
          message={toastConfig.message}
          duration={toastConfig.duration}
          position={toastConfig.position}
          onClose={hideToast}
        />
      </View>
    </AlertContext.Provider>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  },
});

// Custom hook to use the alert context
export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export default AlertContext;
