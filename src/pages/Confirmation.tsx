import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export const Confirmation: React.FC = () => {
  const navigation = useNavigation();

  const handleMoveOn = () => {
    navigation.navigate("PlantSelect");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😄</Text>

        <Text style={styles.title}>Prontinho!</Text>

        <Text style={styles.subTitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>

        <View style={styles.footer}>
          <Button onPress={handleMoveOn}>Começar</Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 30,
  },
  emoji: {
    fontSize: 78,
  },
  title: {
    fontSize: 22,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,
    lineHeight: 38,
    marginTop: 15,
  },
  subTitle: {
    fontSize: 17,
    fontFamily: fonts.text,
    color: colors.heading,
    textAlign: "center",
    paddingVertical: 10,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 25,
  },
});
