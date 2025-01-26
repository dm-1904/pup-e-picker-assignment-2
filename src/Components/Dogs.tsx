// Right now these dogs are constant, but in reality we should be getting these from our server

import { useCallback, useContext, useEffect, useState } from "react";
import { AllDogContext, Dog } from "../types";
import { Requests } from "../api";
import { DogCard } from "./DogCard";
import { CreateDogForm } from "./CreateDogForm";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  // all dogs are a piece of state. set up react context for this.
  const { allDogs, setAllDogs } = useContext(AllDogContext);
  const [isLoading, setIsLoading] = useState(true);
  const { activeTab } = useContext(AllDogContext);

  // const fetchAndSetAllDogs = () => {
  //   return Requests.getAllRequests().then(setAllDogs);
  // };
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

  // useEffect(() => {
  //   fetchAndSetAllDogs();
  // }, [setAllDogs]);

  // useEffect(() => {
  //   async () => {
  //     console.log("Fetching dogs...");
  //     try {
  //       const dogs = await Requests.getAllRequests();
  //       setAllDogs(dogs);
  //     } catch (error) {
  //       console.error("Failed to fetch dogs:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   // fetchDogs();
  // }, [setAllDogs]);

  // useEffect(() => {
  //   async () => {
  //     try {
  //       await fetchAndSetAllDogs();
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  // });

  //just fetching and setting dogs, dependency array

  // const handleFavoriteClick = (dog: Dog) => {
  //   const updateDog = { ...dog, isFavorite: !dog.isFavorite };
  //   Requests.updateItem(dog.id, updateDog).then(() => fetchAndSetAllDogs());
  // };
  // const handleFavoriteClick = async (dog: Dog) => {
  //   const updatedDog = { ...dog, isFavorite: !dog.isFavorite };

  //   try {
  //     await Requests.updateItem(dog.id, updatedDog);
  //     await fetchAndSetAllDogs();
  //   } catch (error) {
  //     console.error("Failed to update dog:", error);
  //   }
  // };
  const handleFavoriteClick = async (dog: Dog) => {
    const updatedDog = { ...dog, isFavorite: !dog.isFavorite };

    try {
      await Requests.updateItem(dog.id, updatedDog);
      await fetchAndSetAllDogs();
    } catch (error) {
      console.error("Failed to update dog:", error);
    }
  };

  // const renderDogCards = (dogs: Dog[]) => {
  //   return dogs.map((dog) => (
  //     <div key={dog.id}>
  //       <DogCard
  //         dog={dog}
  //         onTrashIconClick={() => {
  //           Requests.deleteItem(dog.id).then(() => fetchAndSetAllDogs());
  //         }}
  //         onHeartClick={() => handleFavoriteClick(dog)}
  //         onEmptyHeartClick={() => handleFavoriteClick(dog)}
  //         isLoading={isLoading}
  //       />
  //     </div>
  //   ));
  // };
  const renderDogCards = (dogs: Dog[]) => {
    return dogs.map((dog) => (
      <div key={dog.id}>
        <DogCard
          dog={dog}
          onTrashIconClick={() => {
            setIsLoading(true);
            Requests.deleteItem(dog.id)
              .then(() => fetchAndSetAllDogs())
              .finally(() => setIsLoading(false));
          }}
          onHeartClick={() => {
            handleFavoriteClick(dog).catch((error) => {
              console.error("Error handleing favorite click:", error);
            });
          }}
          onEmptyHeartClick={() => {
            handleFavoriteClick(dog).catch((error) => {
              console.error("Error handling favorite click", error);
            });
          }}
          isLoading={isLoading}
        />
      </div>
    ));
  };
  return (
    <>
      <section className="dog-section">
        {/* {renderDogCards(allDogs)} */}
        {activeTab === "none" && renderDogCards(allDogs)}
        {activeTab === "fav" &&
          renderDogCards(allDogs.filter((dog) => dog.isFavorite))}
        {activeTab === "unfav" &&
          renderDogCards(allDogs.filter((dog) => !dog.isFavorite))}
        {activeTab === "create" && <CreateDogForm />}
      </section>
    </>
  );
};
