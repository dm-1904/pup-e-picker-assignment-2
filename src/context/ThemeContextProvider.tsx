import { ReactNode, useState } from "react";
import { AllDogContext, Dog } from "../types";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  // const fetchDogs = () => {
  //   // get Request
  //   // then set dogs list
  //   // catch for errors
  // }

  // useEffect

  //

  return (
    <AllDogContext.Provider value={{ allDogs, setAllDogs }}>
      {children}
    </AllDogContext.Provider>
  );
};
