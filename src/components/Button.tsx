import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface ButtonProps extends RectButtonProps {
  enabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  enabled = true,
  ...props
}) => {
  return (
    <RectButton
      style={[
        styles.container,
        {
          backgroundColor: enabled ? colors.green : colors.green_light,
        },
      ]}
      enabled={enabled}
      rippleColor={colors.green_light}
      {...props}
    >
      <Text style={styles.text}>{children}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fonts.heading,
  },
});
