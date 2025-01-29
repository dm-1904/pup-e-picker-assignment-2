import { createContext, ReactNode, useEffect, useState } from "react";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type TDogContext = {
  allDogs: Dog[];
  setAllDogs: (dogsList: Dog[]) => void;
  activeTab: ActiveTab;
  setActiveTab: (name: ActiveTab) => void;
  isLoading: boolean;
  setIsLoading: (arg: boolean) => void;
  handleTabChange: (tab: ActiveTab) => void;
  fetchAndSetAllDogs: () => Promise<void>;
  handleCreateDog: (dogData: Partial<Dog>) => Promise<Dog>;
  dogsList: Record<ActiveTab, Dog[]>;
  handleTrashClick: (id: string) => void;
  handleFavoriteClick: (id: string, isFavorite: boolean) => Promise<void>;
};

export const DogContext = createContext({} as TDogContext);
const { getAllDogs, postItem, deleteItem, updateItem } = Requests;

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchAndSetAllDogs = async () => {
    return getAllDogs().then((dogs) => {
      setAllDogs(dogs);
    });
  };

  useEffect(() => {
    fetchAndSetAllDogs().catch((error) => {
      console.error("Failed to fetch dogs:", error);
    });
  }, []);

  const handleTabChange = (tabName: ActiveTab) => {
    const newTabValue = activeTab === tabName ? "all" : tabName;
    setActiveTab(newTabValue);
  };

  const handleCreateDog = (dogData: Partial<Dog>) => {
    const { name, description, image } = dogData;
    setIsLoading(true);
    const newDog = {
      name,
      description,
      image,
      isFavorite: false,
    };
    return postItem(newDog as Omit<Dog, "id">)
      .then(async (data: Dog) => {
        await fetchAndSetAllDogs().catch((error) => {
          console.error("Failed to fetch and set all dogs:", error);
        });
        toast.success(`✅ ${name} has been added! 🐾`);
        return data;
      })
      .catch((error) => {
        toast.error("Something went wrong");
        throw error;
      })
      .finally(() => setIsLoading(false));
  };

  const handleFavoriteClick = async (
    id: string,
    isFavorite: boolean
  ): Promise<void> => {
    const dog = allDogs.find((dog) => dog.id === Number(id));
    if (!dog) return;

    const updatedDog = { ...dog, isFavorite };

    try {
      await updateItem(dog.id, updatedDog);
      await fetchAndSetAllDogs();
    } catch (error) {
      console.error("Failed to update dog:", error);
    }
  };

  const handleTrashClick = (id: string): void => {
    try {
      deleteItem(Number(id))
        .then(() => fetchAndSetAllDogs())
        .catch((error) => {
          console.error("Failed to delete dog:", error);
        });
    } catch (error) {
      console.error("Failed to delete dog:", error);
    }
  };

  const dogsList: Record<ActiveTab, Dog[]> = {
    all: allDogs,
    favorited: allDogs.filter((dog) => dog.isFavorite),
    unfavorited: allDogs.filter((dog) => !dog.isFavorite),
    createDog: [],
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
        handleCreateDog,
        dogsList,
        handleTrashClick,
        handleFavoriteClick,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};
