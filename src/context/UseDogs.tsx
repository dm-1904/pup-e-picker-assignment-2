import { useContext } from "react";
import { DogContext } from "./DogsContextProvider";

export const useDogs = () => useContext(DogContext);
