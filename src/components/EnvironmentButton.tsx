import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnvironmentButtonProps extends RectButtonProps {
  active?: boolean;
}

export const EnvironmentButton: React.FC<EnvironmentButtonProps> = ({
  children,
  active = false,
  ...props
}) => {
  return (
    <RectButton
      style={[
        styles.container,
        {
          backgroundColor: active ? colors.green_light : colors.shape,
        },
      ]}
      rippleColor={colors.green_light}
      {...props}
    >
      <Text
        style={{
          color: active ? colors.green_dark : colors.heading,
          fontFamily: active ? fonts.heading : fonts.text,
        }}
      >
        {children}
      </Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 76,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginRight: 5,
  },
});
