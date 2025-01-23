import { createContext } from "react";
import { z } from "zod";

export const dogSchema = z.object({
  id: z.number(),
  name: z.string(),
  image: z.string(),
  description: z.string(),
  isFavorite: z.boolean(),
});

export type Dog = z.infer<typeof dogSchema>;

export const allDogContextSchema = z.object({
  allDogs: z.array(dogSchema),
  setAllDogs: z.function().args(z.array(dogSchema)).returns(z.void()),
});

export type AllDogContextType = z.infer<typeof allDogContextSchema>;

const initialDogContext: AllDogContextType = {
  allDogs: [],
  setAllDogs: (dogs: Dog[]) => {
    initialDogContext.allDogs = dogs;
  },
};

export const AllDogContext =
  createContext<AllDogContextType>(initialDogContext);
