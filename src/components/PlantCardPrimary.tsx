import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { SvgFromUri } from "react-native-svg";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import Plant from "../entities/Plant";

interface PlantCardProps extends RectButtonProps {
  data: Plant;
}

export const PlantCardPrimary: React.FC<PlantCardProps> = ({
  data,
  ...props
}) => {
  return (
    <RectButton
      style={styles.container}
      rippleColor={colors.green_light}
      {...props}
    >
      <SvgFromUri uri={data.photo} width={70} height={70} />
      <Text style={styles.text}>{data.name}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 160,
    maxWidth: "45%",
    backgroundColor: colors.shape,
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  text: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
    marginVertical: 16,
  },
});
