// Right now these dogs are constant, but in reality we should be getting these from our server

import { useContext } from "react";
import { AllDogContext, Dog } from "../types";
import { Requests } from "../api";
import { DogCard } from "./DogCard";
import { CreateDogForm } from "./CreateDogForm";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  const { allDogs, fetchAndSetAllDogs, isLoading, setIsLoading, activeTab } =
    useContext(AllDogContext);

  const handleFavoriteClick = async (dog: Dog) => {
    const updatedDog = { ...dog, isFavorite: !dog.isFavorite };

    try {
      await Requests.updateItem(dog.id, updatedDog);
      await fetchAndSetAllDogs();
    } catch (error) {
      console.error("Failed to update dog:", error);
    }
  };

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
