import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Dog } from "../types";
import { DogContext } from "../context/DogsContextProvider";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { allDogs } = useContext(DogContext);
  const [favoriteDogs, setFavoritedDogs] = useState<Dog[]>([]);
  const { activeTab } = useContext(DogContext);
  const { handleTabChange } = useContext(DogContext);

  const fetchAndSetFavoritedDogs = useCallback(() => {
    const favorited = allDogs.filter((dog) => dog.isFavorite);
    setFavoritedDogs(favorited);
  }, [allDogs]);

  useEffect(() => {
    fetchAndSetFavoritedDogs();
  }, [allDogs, fetchAndSetFavoritedDogs]);
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "favorited" ? "active" : ""}`}
            onClick={() => {
              handleTabChange("favorited");
            }}
          >
            favorited ( {favoriteDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeTab === "unfavorited" ? "active" : ""
            }`}
            onClick={() => {
              handleTabChange("unfavorited");
            }}
          >
            unfavorited ( {allDogs.length - favoriteDogs.length} )
          </div>
          <div
            className={`selector ${activeTab === "createDog" ? "active" : ""}`}
            onClick={() => {
              handleTabChange("createDog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
