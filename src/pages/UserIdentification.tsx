import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { Button } from "../components/Button";

export const UserIdentification: React.FC = () => {
  const navigation = useNavigation();

  const [isFocused, setIsFocused] = useState(false);
  const [name, setName] = useState("");

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleSubmit = () => {
    navigation.navigate("Confirmation");
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View>
                <Text style={styles.emoji}>{!!name ? "😄" : "😃"}</Text>
                <Text style={styles.title}>
                  Como podemos {`\n`} chamar você?
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || !!name) && {
                    borderColor: colors.green,
                  },
                ]}
                placeholder="Digite seu nome"
                onBlur={handleInputBlur}
                onFocus={handleInputFocus}
                onChangeText={setName}
                value={name}
              />
              <View style={styles.footer}>
                <Button onPress={handleSubmit} enabled={!!name}>
                  Confirmar
                </Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  form: {
    flex: 1,
    paddingHorizontal: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 44,
    textAlign: "center",
    color: colors.heading,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },
  footer: {
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
