import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "../styles/colors";

import { Welcome } from "../pages/Welcome";
import { UserIdentification } from "../pages/UserIdentification";
import { Confirmation } from "../pages/Confirmation";
import { PlantSave } from "../pages/PlantSave";
import AuthRoutes from "./tab.routes";
import { useUser } from "../contexts/UserContext";

const stackRoutes = createStackNavigator();

export const StackRoutes: React.FC = () => {
  const { username } = useUser();

  return (
    <stackRoutes.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      {!username ? (
        <>
          <stackRoutes.Screen name="Welcome" component={Welcome} />
          <stackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}
          />
        </>
      ) : (
        <>
          <stackRoutes.Screen name="PlantSelect" component={AuthRoutes} />
          <stackRoutes.Screen name="PlantSave" component={PlantSave} />
          <stackRoutes.Screen name="MyPlants" component={AuthRoutes} />
        </>
      )}
      <stackRoutes.Screen name="Confirmation" component={Confirmation} />
    </stackRoutes.Navigator>
  );
};
