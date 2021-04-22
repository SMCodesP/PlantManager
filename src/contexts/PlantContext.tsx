import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Plant from "../entities/Plant";
import { format, formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

type PlantType = {
  plants: Plant[];
  savePlant(plant: Plant): Promise<void>;
  nextWatered: string;
};

const PlantContext = createContext<PlantType>({} as PlantType);

const PlantProvider: React.FC = ({ children }) => {
  const [plants, setPlants] = useState<PlantType["plants"]>([]);
  const [nextWatered, setNextWatered] = useState<string>("");

  useEffect(() => {
    refreshPlants();
  }, []);

  useEffect(() => {
    (async () => {
      if (plants && plants[0] && plants[0].dateTimeNotification) {
        const nextTime = formatDistance(
          new Date(plants[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          { locale: ptBR }
        );
        setNextWatered(
          `Não esqueça de regar a ${plants[0].name} em ${nextTime}.`
        );
      }
      let plantsObject: {
        [key: string]: {
          data: Plant;
        };
      } = {};
      plants.forEach((plant) => {
        plantsObject[String(plant.id)] = {
          data: plant,
        };
      });
      await AsyncStorage.setItem(
        "@plantmanager:plants",
        JSON.stringify(plantsObject)
      );
    })();
  }, [plants]);

  const refreshPlants = async () => {
    const data = await AsyncStorage.getItem("@plantmanager:plants");
    setPlants(
      Object.values(
        JSON.parse(data || "{}") as {
          [key: string]: {
            data: Plant;
          };
        }
      )
        .map(({ data: plant }) => plant)
        .sort((a, b) =>
          Math.floor(
            new Date(a.dateTimeNotification || new Date()).getTime() / 1000 -
              Math.floor(
                new Date(b.dateTimeNotification || new Date()).getTime() / 1000
              )
          )
        )
    );
  };

  const savePlant = async (plant: Plant): Promise<void> => {
    setPlants((state) =>
      [
        ...state,
        {
          ...plant,
          ...(plant.dateTimeNotification && {
            hour: format(new Date(plant.dateTimeNotification), "HH:mm"),
          }),
        },
      ].sort((a, b) =>
        Math.floor(
          new Date(a.dateTimeNotification || new Date()).getTime() / 1000 -
            Math.floor(
              new Date(b.dateTimeNotification || new Date()).getTime() / 1000
            )
        )
      )
    );
  };

  return (
    <PlantContext.Provider
      value={{
        plants,
        savePlant,
        nextWatered,
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};

function usePlant(): PlantType {
  const context = useContext(PlantContext);

  return context;
}

export { usePlant, PlantProvider };

export default PlantContext;
