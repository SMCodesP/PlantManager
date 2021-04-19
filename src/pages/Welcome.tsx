import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";

import watering from "../assets/watering.png";
import colors from "../styles/colors";

export const Welcome: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {`\n`}
        suas plantas {`\n`}
        de forma fácil
      </Text>

      <Image source={watering} style={styles.image} />

      <Text style={styles.subTitle}>
        Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
        sempre que precisar.
      </Text>

      <RectButton style={styles.button} rippleColor={colors.green_light}>
        <Text style={styles.textButton}>&gt;</Text>
      </RectButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.heading,
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: 56,
    width: 56,
  },
  image: {
    width: 292,
    height: 284,
  },
  textButton: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
});
