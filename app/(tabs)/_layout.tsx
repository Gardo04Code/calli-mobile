import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#ff3b3b",
        tabBarInactiveTintColor: "#ffffff",

        tabBarStyle: {
          backgroundColor: "#0f1f3d",
          height: 82,
          paddingTop: 6,
          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginBottom: 2,
        },

        tabBarIconStyle: {
          marginTop: 2,
        },

        tabBarItemStyle: {
          paddingHorizontal: 0,
        },
      }}
    >
      {/* INICIO */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />

      {/* SERVICIOS */}
      <Tabs.Screen
        name="servicios"
        options={{
          title: "Servicios",
          tabBarIcon: ({ color }) => (
            <Ionicons name="construct" size={22} color={color} />
          ),
        }}
      />

      {/* GALERÍA */}
      <Tabs.Screen
        name="galeria"
        options={{
          title: "Galería",
          tabBarIcon: ({ color }) => (
            <Ionicons name="images" size={22} color={color} />
          ),
        }}
      />

      {/* TRABAJA */}
      <Tabs.Screen
        name="trabaja"
        options={{
          title: "Trabaja con nosotros",
          tabBarLabel: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: 9,
                fontWeight: "600",
                textAlign: "center",
                lineHeight: 10.5,
              }}
              numberOfLines={2}
            >
              Trabaja{"\n"}con nosotros
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="briefcase" size={22} color={color} />
          ),
        }}
      />

      {/* CONTÁCTANOS */}
      <Tabs.Screen
        name="contactanos"
        options={{
          title: "Contáctanos",
          tabBarLabel: ({ color }) => (
            <Text
              style={{
                color,
                fontSize: 9.5,
                fontWeight: "600",
                textAlign: "center",
                lineHeight: 11,
              }}
              numberOfLines={1}
            >
              Contáctanos
            </Text>
          ),
          tabBarIcon: ({ color }) => (
            <Ionicons name="call" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
