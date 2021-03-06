import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";

import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { useUser } from "../contexts/UserContext";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export const Header: React.FC = () => {
  const { username } = useUser();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.username}>{username}</Text>
      </View>

      <Image
        source={{
          uri: "https://www.smcodes.tk/favicon.jpg",
        }}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  username: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 40,
  },
});
