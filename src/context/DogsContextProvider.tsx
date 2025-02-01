import { createContext, ReactNode, useEffect, useState } from "react";
import { ActiveTab, Dog } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type TDogContext = {
  setAllDogs: (dogsList: Dog[]) => void;
  activeTab: ActiveTab;
  setActiveTab: (name: ActiveTab) => void;
  isLoading: boolean;
  setIsLoading: (arg: boolean) => void;
  handleTabChange: (tab: ActiveTab) => void;
  fetchAndSetAllDogs: () => Promise<void>;
  handleCreateDog: (dogData: Partial<Dog>) => Promise<void>;
  dogsList: Record<ActiveTab, Dog[]>;
  handleTrashClick: (id: string) => Promise<void>;
  handleFavoriteClick: (id: string, isFavorite: boolean) => Promise<void>;
  favoritedDogsNum: number;
  unFavoritedDogsNum: number;
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
      .then(() => fetchAndSetAllDogs())
      .finally(() => setIsLoading(false));
  };

  const handleFavoriteClick = async (
    id: string,
    isFavorite: boolean
  ): Promise<void> => {
    const dog = allDogs.find((dog) => dog.id === Number(id));
    if (!dog) return;

    const updatedDog = { ...dog, isFavorite };

    setAllDogs(
      allDogs.map((dogItem) => (dogItem.id !== dog.id ? dogItem : updatedDog))
    );

    try {
      await updateItem(dog.id, updatedDog);
      toast.success(`Favorites updated.`);
    } catch (error) {
      toast.error(`Favorites failed to update.`);
      setAllDogs(allDogs);
    }
  };

  const handleTrashClick = async (id: string): Promise<void> => {
    const previousDogs = [...allDogs];
    setAllDogs(allDogs.filter((dog) => dog.id !== Number(id)));
    try {
      await deleteItem(Number(id));
      toast.success(`Dog deleted`);
    } catch (error) {
      console.error("Failed to delete dog:", error);
      setAllDogs(previousDogs);
      toast.error("Failed to delete dog");
    }
  };

  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite);
  const unFavoritedDogs = allDogs.filter((dog) => !dog.isFavorite);

  const dogsList: Record<ActiveTab, Dog[]> = {
    all: allDogs,
    favorited: favoritedDogs,
    unfavorited: unFavoritedDogs,
    createDog: [],
  };

  return (
    <DogContext.Provider
      value={{
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
        favoritedDogsNum: favoritedDogs.length,
        unFavoritedDogsNum: unFavoritedDogs.length,
      }}
    >
      {children}
    </DogContext.Provider>
  );
};
