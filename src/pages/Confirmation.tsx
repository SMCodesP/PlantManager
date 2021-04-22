import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export interface ConfirmationParams {
  title: string;
  subTitle: string;
  buttonTitle: string;
  icon: "smile" | "hug";
  nextScreen: string;
}

const emojis = {
  smile: "😄",
  hug: "🤗",
};

export const Confirmation: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    icon,
    title,
    subTitle,
    buttonTitle,
    nextScreen,
  } = route.params as ConfirmationParams;

  const handleMoveOn = () => {
    navigation.navigate(nextScreen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.subTitle}>{subTitle}</Text>

        <View style={styles.footer}>
          <Button onPress={handleMoveOn}>{buttonTitle}</Button>
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
