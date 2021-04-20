import React from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  View,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";

import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import watering from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export const Welcome: React.FC = () => {
  const navigation = useNavigation();

  const handleStart = () => {
    navigation.navigate("UserIdentification");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {`\n`}
          suas plantas de {`\n`}
          forma fácil
        </Text>

        <Image source={watering} style={styles.image} resizeMode="contain" />

        <Text style={styles.subTitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
        </Text>

        <RectButton
          style={styles.button}
          rippleColor={colors.green_light}
          onPress={handleStart}
        >
          <Feather name="chevron-right" style={styles.iconButton} />
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
  },
  subTitle: {
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  image: {
    height: Dimensions.get("window").width * 0.7,
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    height: 56,
    width: 56,
  },
  iconButton: {
    color: colors.white,
    fontSize: 32,
  },
});
