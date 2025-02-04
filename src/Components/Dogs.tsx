// Right now these dogs are constant, but in reality we should be getting these from our server

import { Dog } from "../types";
import { DogCard } from "./DogCard";
import { useDogs } from "../context/UseDogs";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  const { dogsArr, isLoading, handleFavoriteClick, handleTrashClick } =
    useDogs();

  return (
    <>
      {dogsArr.map((dog: Dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onTrashIconClick={() => {
            void handleTrashClick(dog.id.toString());
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
    </>
  );
};
