import React, { useEffect, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  StatusBar, 
  Dimensions, 
  ActivityIndicator 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LinearGradient from "react-native-linear-gradient";
import { RootStackParamList } from "../../../navigation/rootStackParamList";
import { getFromStore } from "../../../storage/device";
import { KeyConstants } from "../../../storage/constant";

const { width } = Dimensions.get("window");

export default function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Check login state and navigate after delay
    const timer = setTimeout(async () => {
      const isLoggedIn = await getFromStore(KeyConstants.LOGGED_IN);
      if (isLoggedIn === "true") {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    }, 3000); // 3 seconds total duration

    return () => clearTimeout(timer);
  }, [navigation, fadeAnim, scaleAnim]);

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <LinearGradient
        colors={["#27A745", "#1a702d", "#0d3c18"]}
        style={StyleSheet.absoluteFillObject}
      />

      <Animated.View 
        style={[
          styles.content, 
          { 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }] 
          }
        ]}
      >
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>WV</Text>
        </View>
        
        <Text style={styles.brandName}>WellVantage</Text>
        <Text style={styles.tagline}>Elevate Your Fitness Journey</Text>
      </Animated.View>

      <View style={styles.footer}>
        <ActivityIndicator color="#ffffff" size="small" style={styles.loader} />
        <Text style={styles.footerText}>Premium Gym Experience</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  logoText: {
    fontSize: 52,
    fontWeight: "900",
    color: "#FFFFFF",
    letterSpacing: -2,
  },
  brandName: {
    fontSize: 36,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
    marginBottom: 8,
    textTransform: "uppercase",
  },
  tagline: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    letterSpacing: 2,
  },
  footer: {
    position: "absolute",
    bottom: 60,
    alignItems: "center",
  },
  loader: {
    marginBottom: 10,
  },
  footerText: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.5)",
    fontWeight: "600",
    letterSpacing: 4,
    textTransform: "uppercase",
  },
});
