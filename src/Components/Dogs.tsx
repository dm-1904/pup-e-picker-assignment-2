// Right now these dogs are constant, but in reality we should be getting these from our server

import { useContext, useEffect, useState } from "react";
import { AllDogContext, Dog } from "../types";
import { Requests } from "../api";
import { DogCard } from "./DogCard";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  // all dogs are a piece of state. set up react context for this.
  const { allDogs, setAllDogs } = useContext(AllDogContext);
  const [isLoading, setIsLoading] = useState(true);

  // const fetchAndSetAllDogs = () => {
  //   return Requests.getAllRequests().then(setAllDogs);
  // };
  const fetchAndSetAllDogs = async () => {
    try {
      const dogs = await Requests.getAllRequests();
      setAllDogs(dogs);
    } catch (error) {
      console.error("Failed to fetch dogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   fetchAndSetAllDogs();
  // }, []);

  useEffect(() => {
    async () => {
      try {
        await fetchAndSetAllDogs();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  });

  // const handleFavoriteClick = (dog: Dog) => {
  //   const updateDog = { ...dog, isFavorite: !dog.isFavorite };
  //   Requests.updateItem(dog.id, updateDog).then(() => fetchAndSetAllDogs());
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
        {renderDogCards(allDogs)}
        {/* {displayAll && renderDogCards(allDogs)}
      {displayFavorites &&
        renderDogCards(allDogs.filter((dog) => dog.isFavorite))}
      {displayUnfavorites &&
        renderDogCards(allDogs.filter((dog) => !dog.isFavorite))} */}
      </section>
    </>
  );
};
