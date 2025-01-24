import { ReactNode, useState } from "react";
import { AllDogContext, Dog, TActiveTab } from "../types";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState("none");
  const [displayAll, setDisplayAll] = useState(true);
  const [displayFavorites, setDisplayFavorites] = useState(false);
  const [displayUnfavorites, setDisplayUnfavorites] = useState(false);

  const handleTabChange = (tabName: TActiveTab) => {
    setActiveTab(tabName);
  };

  // const fetchDogs = () => {
  //   // get Request
  //   // then set dogs list
  //   // catch for errors
  // }

  // useEffect

  //

  return (
    <AllDogContext.Provider
      value={{
        allDogs,
        setAllDogs,
        activeTab,
        setActiveTab,
        displayAll,
        setDisplayAll,
        displayFavorites,
        setDisplayFavorites,
        displayUnfavorites,
        setDisplayUnfavorites,
      }}
    >
      {children}
    </AllDogContext.Provider>
  );
};
