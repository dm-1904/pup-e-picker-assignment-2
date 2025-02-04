import { ReactNode } from "react";
import { useDogs } from "../context/UseDogs";
import { ActiveTab } from "../types";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { activeTab, handleTabChange, favoritedDogsNum, unFavoritedDogsNum } =
    useDogs();

  const sectionsArr = [
    { name: "favorited", itemsNum: favoritedDogsNum },
    { name: "unfavorited", itemsNum: unFavoritedDogsNum },
    { name: "createDog" },
  ];

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {sectionsArr.map((section) => {
            const { name, itemsNum } = section;
            return (
              <div
                className={`selector ${activeTab === name ? "active" : ""}`}
                onClick={() => {
                  handleTabChange(name as ActiveTab);
                }}
              >
                {name} {itemsNum ? `( ${itemsNum} )` : ""}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
