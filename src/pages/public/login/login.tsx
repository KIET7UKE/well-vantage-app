import React, { useState } from "react";
import {
  View,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { Check } from "lucide-react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/rootStackParamList";
import Svg, { Path } from "react-native-svg";
import { useDispatch } from "react-redux";
import { setAuthSlice } from "../../../redux/slices/authSlice";
import { postAPI } from "../../../api/api";
import { setStore } from "../../../storage/device";
import { KeyConstants } from "../../../storage/constant";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import LinearGradient from "react-native-linear-gradient";
import { COLORS } from '../../../constants/colors';
import { styles } from "./loginStyles";

GoogleSignin.configure({
  webClientId: "714064920064-9s44gh29k19ha37b1qucaddkgjkit4kq.apps.googleusercontent.com",
});

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(true);

  const handleGoogleLogin = async () => {
    if (!agreed) return;
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo.data?.idToken;

      if (!idToken) {
        throw new Error("Missing ID token");
      }

      const response = await postAPI<any>("/auth/google", {
        idToken,
      });

      if (response.success) {
        await setStore({ key: KeyConstants.ACCESS_TOKEN, value: response.token });
        await setStore({ key: KeyConstants.LOGGED_IN, value: "true" });
        await setStore({ key: KeyConstants.USER_DATA, value: response.user });

        dispatch(setAuthSlice({ userDetails: response.user }));
        navigation.replace("Home");
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("User cancelled the login flow");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is in progress already");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services not available or outdated");
      } else {
        console.error("Some other error happened:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primary || "#f4632a"} />
        </View>
      )}

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {/* Background Hero Section */}
        <View style={styles.heroSection}>
          <ImageBackground
            source={{ uri: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" }} // Gym image instead of food
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={StyleSheet.absoluteFillObject}
            />
            {/* Brand Identity */}
            <View style={styles.brandContainer}>
              <Text style={[styles.title, { textAlign: 'center', fontSize: 48 }]}>
                WV
              </Text>
            </View>
          </ImageBackground>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.welcomeText}>Welcome to WellVantage</Text>
            <Text style={styles.title}>
              Transform Your{"\n"}
              <Text style={styles.titleHighlight}>Gym Experience.</Text>
            </Text>
            <Text style={styles.subtitle}>
              Manage workouts, track progress, and grow your fitness community with our premium platform.
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            {/* Google Login Button */}
            <TouchableOpacity
              style={[styles.primaryButton, (loading || !agreed) && { opacity: 0.6 }]}
              onPress={handleGoogleLogin}
              disabled={loading || !agreed}
              activeOpacity={0.8}
            >
              <Svg width="24" height="24" viewBox="0 0 48 48">
                <Path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                <Path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                <Path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24s.92 7.54 2.56 10.78l7.97-6.19z" />
                <Path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                <Path fill="none" d="M0 0h48v48H0z" />
              </Svg>
              <Text style={styles.primaryButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.checkbox, agreed && styles.checkboxActive]}
              onPress={() => setAgreed(!agreed)}
              activeOpacity={0.8}
            >
              {agreed && <Check size={14} color={COLORS.white || "#ffffff"} strokeWidth={4} />}
            </TouchableOpacity>

            <Text style={styles.footerText} onPress={() => setAgreed(!agreed)}>
              By continuing, you agree to our{" "}
              <Text style={styles.termsText}>Terms & Privacy Policy</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}


