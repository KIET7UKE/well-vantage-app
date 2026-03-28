import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  Home as HomeIcon,
  User as UserIcon,
} from "lucide-react-native";

import { Home } from "../pages/private/home/home";
import { COLORS } from '../constants/colors';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="MainHome"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray400,
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 8,
          borderTopWidth: 1,
          borderTopColor: "rgba(255,255,255,0.05)",
          backgroundColor: COLORS.backgroundLight,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginBottom: 4,
        },
      }}
    >
      <Tab.Screen
        name="MainHome"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }: { color: string; size: number }) => (
            <HomeIcon size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
    </Tab.Navigator>
  );
}

