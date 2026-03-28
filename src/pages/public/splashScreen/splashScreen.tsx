import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../navigation/rootStackParamList";
import { useEffect } from "react";
import { getFromStore } from "../../../storage/device";
import { KeyConstants } from "../../../storage/constant";
import { Text, View } from "react-native";




export default function SplashScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Check login state and navigate after 2 seconds
    const timer = setTimeout(async () => {
      const isLoggedIn = await getFromStore(KeyConstants.LOGGED_IN);
      if (isLoggedIn === "true") {
        navigation.replace("Home");
      } else {
        navigation.replace("Login");
      }
    }, 2500); // Slightly longer for the premium feel

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <View>
      <Text>SplashScreen</Text>
    </View>
  );
}



