import { ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { Dog } from "../types";
import { DogContext } from "../context/DogsContextProvider";
import { useDogs } from "../context/UseDogs";

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
            favorited ( {favoritedDogsNum} )
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
            unfavorited ( {unFavoritedDogsNum} )
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
