import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

import { Header } from "../components/Header";
import { EnvironmentButton } from "../components/EnvironmentButton";
import { PlantCardPrimary } from "../components/PlantCardPrimary";
import { Load } from "../components/Load";

import api from "../services/api";

import Environment from "../entities/Environment";
import Plant from "../entities/Plant";

import { useNavigation } from "@react-navigation/native";

export const PlantSelect: React.FC = () => {
  const navigation = useNavigation();

  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("");
  const [filteredPlants, setFilterPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedAll, setLoadedAll] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: environments_data } = await api.get<Environment[]>(
        "plants_environments?_sort=title&_order=asc"
      );
      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...environments_data,
      ]);
      setEnvironmentSelected("all");
      await loadPlants();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!loadedAll) {
        setLoadingMore(true);
        await loadPlants();
        setLoadingMore(false);
      }
    })();
  }, [page]);

  useEffect(() => {
    if (environmentSelected === "all") {
      return setFilterPlants(plants);
    }
    setFilterPlants(
      plants.filter((plant) => plant.environments.includes(environmentSelected))
    );
  }, [environmentSelected, plants]);

  const loadPlants = async () => {
    const { data: plants_data } = await api.get<Plant[]>(
      `plants?_sort=name&_order=asc&_page=${page}&_limit=8`
    );

    if (!plants_data || plants_data.length === 0) return setLoadedAll(true);

    if (page > 1) {
      setPlants((oldPlants) => [...oldPlants, ...plants_data]);
    } else {
      setPlants(plants_data);
    }
  };

  const handleMore = (distanceFromEnd: number) => {
    if (distanceFromEnd < 1 || loading || loadingMore || loadedAll) return;

    if (!loadedAll) {
      setPage((oldPage) => oldPage + 1);
    }
  };

  const handleEnvironmentSelected = (environment: string) => {
    setEnvironmentSelected(environment);
  };

  const handlePlantSelect = (plant: Plant) => {
    navigation.navigate("PlantSave", { plant });
  };

  if (loading) return <Load />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subTitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={environments}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.environmentList}
          renderItem={({ item }) => (
            <EnvironmentButton
              onPress={() => handleEnvironmentSelected(item.key)}
              active={item.key === environmentSelected}
            >
              {item.title}
            </EnvironmentButton>
          )}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => String(item.id)}
          numColumns={2}
          renderItem={({ item }) => (
            <PlantCardPrimary
              onPress={() => handlePlantSelect(item)}
              data={item}
            />
          )}
          onEndReached={({ distanceFromEnd }) => handleMore(distanceFromEnd)}
          onEndReachedThreshold={0.1}
          contentContainerStyle={styles.listPlants}
          {...(loadingMore && {
            ListFooterComponent: <ActivityIndicator color={colors.green} />,
          })}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 30,
  },
  title: {
    fontSize: 17,
    lineHeight: 20,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginTop: 15,
  },
  subTitle: {
    fontSize: 17,
    lineHeight: 20,
    fontFamily: fonts.text,
    color: colors.heading,
  },
  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    paddingHorizontal: 32,
    marginVertical: 5,
  },
  plants: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  listPlants: {
    paddingVertical: 12,
  },
});
