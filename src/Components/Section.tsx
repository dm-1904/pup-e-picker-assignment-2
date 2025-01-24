import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { AllDogContext, Dog, TActiveTab } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { allDogs } = useContext(AllDogContext);
  const [favoriteDogs, setFavoritedDogs] = useState<Dog[]>([]);
  // const [activeTab, setActiveTab] = useState<TActiveTab>("none");

  // const handleTabChange = (tabName: TActiveTab) => {
  //   setActiveTab(tabName);
  // };

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
            className={`selector ${"active"}`}
            onClick={() => {
              alert("click favorited");
            }}
          >
            favorited ( {favoriteDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${""}`}
            onClick={() => {
              alert("click unfavorited");
            }}
          >
            unfavorited ( {10} )
          </div>
          <div
            className={`selector ${""}`}
            onClick={() => {
              alert("clicked create dog");
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
