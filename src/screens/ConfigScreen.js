import React, { useContext } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { ThemeContext } from "../../App";

export default function ConfigScreen() {
  const { darkTheme, setDarkTheme, theme } = useContext(ThemeContext);

  return (
    <View
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}
    >
      <Text style={[styles.text, { color: theme.textColor }]}>
        Tema atual: {darkTheme ? "Escuro" : "Claro"}
      </Text>
      <Button
        title="Alternar Tema"
        onPress={() => setDarkTheme(!darkTheme)}
        accessibilityLabel="Botão para alternar tema claro ou escuro"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: { fontSize: 18, marginBottom: 20 },
});