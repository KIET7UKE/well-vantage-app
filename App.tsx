import { StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { navigationRef } from "./src/navigation/customNavigation";
import { RootStackParamList } from "./src/navigation/rootStackParamList";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AlertProvider } from "./src/context/AlertContext";
import { AppRoutes } from "./appRoutes";
import { COLORS } from "./src/constants/colors";
const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (

    <SafeAreaProvider>
      <AlertProvider>
        <StatusBar
          barStyle={"light-content"}
          backgroundColor="transparent"
          translucent
        />
        <AppContent />
      </AlertProvider>
    </SafeAreaProvider>
  );
}

function AppContent() {
  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }} edges={['top']}>
        <Stack.Navigator initialRouteName={"SplashScreen"}>
          {AppRoutes?.map((route, index) => (
            <Stack.Screen
              key={index}
              name={route.name as keyof RootStackParamList}
              component={route.component}
              options={route.options}
            />
          ))}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

export default App;
