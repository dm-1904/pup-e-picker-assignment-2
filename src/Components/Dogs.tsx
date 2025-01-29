// Right now these dogs are constant, but in reality we should be getting these from our server

import { Dog } from "../types";
import { DogCard } from "./DogCard";
import { useDogs } from "../context/UseDogs";
import { CreateDogForm } from "./CreateDogForm";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  const {
    dogsList,
    activeTab,
    isLoading,
    handleFavoriteClick,
    handleTrashClick,
  } = useDogs();
  const dogData = dogsList[activeTab];
  return (
    <>
      {(activeTab === "all" ||
        activeTab === "favorited" ||
        activeTab === "unfavorited") &&
        dogData.map((dog: Dog) => (
          <DogCard
            dog={dog}
            onTrashIconClick={() => {
              handleTrashClick(dog.id.toString());
            }}
            onHeartClick={() => {
              void handleFavoriteClick(dog.id.toString(), false);
            }}
            onEmptyHeartClick={() => {
              void handleFavoriteClick(dog.id.toString(), true);
            }}
            isLoading={isLoading}
          />
        ))}
      {activeTab === "createDog" && <CreateDogForm />}
    </>
  );
};
