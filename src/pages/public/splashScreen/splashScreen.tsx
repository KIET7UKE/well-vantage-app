import React, { useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  StatusBar, 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/rootStackParamList";
import { getFromStore } from "../../../storage/device";
import { KeyConstants } from "../../../storage/constant";

export default function SplashScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Check login state and navigate after a short delay
    const timer = setTimeout(async () => {
      const isLoggedIn = await getFromStore(KeyConstants.LOGGED_IN);
      if (isLoggedIn === "true") {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    }, 2000); // 2 seconds delay for a quick splash

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#27A745" barStyle="light-content" />
      <Text style={styles.brandName}>WellVantage</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#27A745",
  },
  brandName: {
    fontSize: 40,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});

