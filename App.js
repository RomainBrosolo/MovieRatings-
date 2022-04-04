import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./components/HomeScreen";
import SearchView from "./components/Search/SearchView";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tabs = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tabs.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            switch (route.name) {
              case "Avis":
                iconName = focused ? "star" : "star-outline";
                break;
              case "Recherche":
                iconName = focused ? "search" : "search-outline";
                break;
              default:
                iconName = "ban";
                break;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "white",
          inactiveTintColor: "gray",
          style: {
            backgroundColor: "#112232",
          },
        }}
      >
        <Tabs.Screen name="Avis" component={HomeScreen} />
        <Tabs.Screen name="Recherche" component={SearchView} />
      </Tabs.Navigator>
    </NavigationContainer>
  );
};

export default App;
