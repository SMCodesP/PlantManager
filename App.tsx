import React from "react";
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";

import { Routes } from "./src/routes";

const App: React.FC = () => {
  const [fontIsLoading] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold,
  });

  if (!fontIsLoading) return <AppLoading />;

  return <Routes />;
};

export default App;
