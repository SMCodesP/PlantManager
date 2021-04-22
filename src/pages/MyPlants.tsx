import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import { Header } from "../components/Header";

import waterdrop from "../assets/waterdrop.png";

import colors from "../styles/colors";
import { usePlant } from "../contexts/PlantContext";
import fonts from "../styles/fonts";
import { PlantCardSecundary } from "../components/PlantCardSecundary";

export const MyPlants: React.FC = () => {
  const { plants, nextWatered } = usePlant();

  return (
    <View style={styles.container}>
      <Header />

      {!!nextWatered && (
        <View style={styles.spotlight}>
          <Image source={waterdrop} style={styles.spotlightImage} />

          <Text style={styles.spotlightText}>{nextWatered}</Text>
        </View>
      )}

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList
          data={plants}
          ListEmptyComponent={() => (
            <Text style={styles.emptyPlantsText}>
              Nenhuma plantinha cadastrada
            </Text>
          )}
          keyExtractor={(item) => String(item.dateTimeNotification)}
          renderItem={({ item }) => <PlantCardSecundary data={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 10 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
  emptyPlantsText: {
    fontSize: 16,
    fontFamily: fonts.text,
    color: colors.heading,
    marginLeft: 15,
  },
});
