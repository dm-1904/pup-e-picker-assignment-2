import { ReactNode, useState } from "react";
import { AllDogContext, Dog } from "../types";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);

  return (
    <AllDogContext.Provider value={{ allDogs, setAllDogs }}>
      {children}
    </AllDogContext.Provider>
  );
};
