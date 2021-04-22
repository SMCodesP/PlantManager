import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";

type UserType = {
  username: string;
  setUsername(newUsername: string): void;
};

const UserContext = createContext<UserType>({} as UserType);

const UserProvider: React.FC = ({ children }) => {
  const [username, setUsername] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    (async () => {
      const user = await AsyncStorage.getItem("@plantmanager:user");
      setUsername(user || "");
      setLoadingUser(false);
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("@plantmanager:user", username);
  }, [username]);

  if (loadingUser) return <AppLoading />;

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

function useUser(): UserType {
  const context = useContext(UserContext);

  return context;
}

export { useUser, UserProvider };

export default UserContext;
