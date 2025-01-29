import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";

type TDogContext = {
  allDogs: Dog[];
  setAllDogs: (dogsList: Dog[]) => void;
  activeTab: ActiveTab;
  setActiveTab: (name: ActiveTab) => void;
  isLoading: boolean;
  setIsLoading: (arg: boolean) => void;
  handleTabChange: (tab: ActiveTab) => void;
  fetchAndSetAllDogs: () => void;
};

const DogContext = createContext({} as TDogContext);
const { getAllDogs } = Requests;

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAndSetAllDogs = async () => {
    try {
      const dogs = await getAllDogs();
      setAllDogs(dogs);
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSetAllDogs();
  }, []);

  const handleTabChange = (tabName: ActiveTab) => {
    const newTabValue = activeTab === tabName ? "all" : tabName;
    setActiveTab(newTabValue);
  };

  return (
    <DogContext.Provider
      value={{
        allDogs,
        setAllDogs,
        activeTab,
        setActiveTab,
        handleTabChange,
        isLoading,
        setIsLoading,
        fetchAndSetAllDogs,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};

export const useDogs = () => useContext(DogContext);
