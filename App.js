import React, { useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import ConfigScreen from "./src/screens/ConfigScreen";
import DetailsScreen from "./src/screens/DetailsScreen";
export const ThemeContext = createContext();

const Stack = createNativeStackNavigator();

export default function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  const theme = {
    backgroundColor: darkTheme ? "#121212" : "#fff",
    textColor: darkTheme ? "#fff" : "#000",
  };

  return (
    <ThemeContext.Provider value={{ darkTheme, setDarkTheme, theme }}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Início" }}
          />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={{ title: "Detalhes" }}
          />
          <Stack.Screen
            name="Config"
            component={ConfigScreen}
            options={{ title: "Configurações" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}