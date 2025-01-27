import { ReactNode, useCallback, useEffect, useState } from "react";
import { AllDogContext, Dog } from "../types";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<
    "create" | "fav" | "unfav" | "none"
  >("none");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [picture, setPicture] = useState<string>(Object.values(dogPictures)[0]);

  const fetchAndSetAllDogs = useCallback(async () => {
    // console.log("Fetching dogs...");
    try {
      const dogs = await Requests.getAllRequests();
      setAllDogs(dogs);
      // console.log(dogs);
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setAllDogs]);

  useEffect(() => {
    fetchAndSetAllDogs().catch((error) =>
      console.error("Error fetching dogs:", error)
    );
  }, [fetchAndSetAllDogs, setAllDogs]);

  const handleTabChange = (tabName: "create" | "fav" | "unfav" | "none") => {
    if (activeTab === tabName) {
      setActiveTab("none");
    } else {
      setActiveTab(tabName);
    }
  };

  // const handleFavoriteClick = async (dog: Dog) => {
  //   const updatedDog = { ...dog, isFavorite: !dog.isFavorite };

  //   try {
  //     await Requests.updateItem(dog.id, updatedDog);
  //     await fetchAndSetAllDogs();
  //   } catch (error) {
  //     console.error("Failed to update dog:", error);
  //   }
  // };

  // const renderDogCards = (dogs: Dog[]) => {
  //   return dogs.map((dog) => (
  //     <div key={dog.id}>
  //       <DogCard
  //         dog={dog}
  //         onTrashIconClick={() => {
  //           setIsLoading(true);
  //           Requests.deleteItem(dog.id)
  //             .then(() => fetchAndSetAllDogs())
  //             .finally(() => setIsLoading(false));
  //         }}
  //         onHeartClick={() => {
  //           handleFavoriteClick(dog).catch((error) => {
  //             console.error("Error handleing favorite click:", error);
  //           });
  //         }}
  //         onEmptyHeartClick={() => {
  //           handleFavoriteClick(dog).catch((error) => {
  //             console.error("Error handling favorite click", error);
  //           });
  //         }}
  //         isLoading={isLoading}
  //       />
  //     </div>
  //   ));
  // };

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
        handleTabChange,
        isLoading,
        setIsLoading,
        name,
        setName,
        description,
        setDescription,
        picture,
        setPicture,
        fetchAndSetAllDogs,
      }}
    >
      {children}
    </AllDogContext.Provider>
  );
};
